import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Shield, User, Download, Trash2, FileText, FileJson } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const loadSubmissions = () => {
    try {
      const contacts = JSON.parse(localStorage.getItem('contactForms') || '[]');
      // Ensure all entries have IDs and save back to localStorage
      const contactsWithIds = contacts.map((c: any) => {
        if (!c.id) {
          c.id = crypto.randomUUID();
        }
        return c;
      });
      
      // Save back to localStorage if any IDs were generated
      if (contactsWithIds.length !== contacts.length || contactsWithIds.some((c: any, i: number) => !contacts[i]?.id)) {
        localStorage.setItem('contactForms', JSON.stringify(contactsWithIds));
      }
      
      setSubmissions(
        contactsWithIds.map((c: any) => ({
          id: c.id,
          name: c.name || '',
          email: c.email || '',
          mobile: c.mobile || '',
          message: c.message || '',
          status: c.status || 'new',
          created_at: c.created_at || new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error('Error loading submissions:', error);
      setSubmissions([]);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      toast({ title: 'Access denied', description: 'You do not have admin privileges', variant: 'destructive' });
      navigate('/');
      return;
    }

    loadSubmissions();
    setLoading(false);
  }, [navigate, toast, isAdmin]);

  // Refresh submissions periodically to catch new submissions
  useEffect(() => {
    if (!isAdmin) return;

    const interval = setInterval(() => {
      loadSubmissions();
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [isAdmin]);

  const deleteSubmission = (id: string) => {
    try {
      const contacts = JSON.parse(localStorage.getItem('contactForms') || '[]');
      const initialLength = contacts.length;
      
      // First, ensure all entries have IDs (fix any missing IDs)
      const contactsWithIds = contacts.map((c: any) => {
        if (!c.id) {
          c.id = crypto.randomUUID();
        }
        return c;
      });
      
      // Filter out the submission with matching ID (strict comparison)
      const updated = contactsWithIds.filter((c: any) => {
        const contactId = c.id ? String(c.id).trim() : '';
        const targetId = String(id).trim();
        const matches = contactId !== '' && targetId !== '' && contactId === targetId;
        
        if (!matches) {
          // Also try matching by email + message + date as fallback
          const submission = submissions.find(s => s.id === id);
          if (submission) {
            const emailMatch = c.email === submission.email;
            const messageMatch = c.message === submission.message;
            const dateMatch = c.created_at === submission.created_at;
            if (emailMatch && messageMatch && dateMatch) {
              console.log('Found match by email+message+date:', { c, submission });
              return false; // Don't include this one (delete it)
            }
          }
        }
        
        return !matches;
      });
      
      // Only update if something was actually removed
      if (updated.length < contactsWithIds.length) {
        localStorage.setItem('contactForms', JSON.stringify(updated));
        // Force immediate UI update
        setSubmissions(updated.map((c: any) => ({
          id: c.id,
          name: c.name || '',
          email: c.email || '',
          mobile: c.mobile || '',
          message: c.message || '',
          status: c.status || 'new',
          created_at: c.created_at || new Date().toISOString(),
        })));
        toast({
          title: 'Deleted',
          description: 'Contact submission has been deleted successfully'
        });
      } else {
        console.warn('Delete failed: Submission not found', { 
          id, 
          targetId: String(id).trim(),
          contacts: contactsWithIds.map((c: any) => ({ 
            id: c.id ? String(c.id).trim() : 'MISSING',
            email: c.email,
            message: c.message?.substring(0, 20)
          }))
        });
        toast({
          title: 'Error',
          description: 'Submission not found. Please refresh the page.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete submission. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const downloadAsJSON = (submission: ContactSubmission) => {
    const dataStr = JSON.stringify(submission, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact-${submission.name.replace(/\s+/g, '-')}-${submission.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded',
      description: 'Contact submission downloaded as JSON'
    });
  };

  const downloadAsPDF = (submission: ContactSubmission) => {
    // Create an HTML document that can be printed to PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Form Submission - ${escapeHtml(submission.name)}</title>
  <style>
    @media print {
      body { margin: 0; padding: 20px; }
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #2563eb;
      margin: 0 0 10px 0;
    }
    .field {
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-left: 4px solid #2563eb;
    }
    .label {
      font-weight: bold;
      color: #2563eb;
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #333;
      font-size: 16px;
    }
    .message-box {
      background: #ffffff;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Contact Form Submission</h1>
    <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleString()}</p>
  </div>
  
  <div class="field">
    <span class="label">Name</span>
    <div class="value">${escapeHtml(submission.name)}</div>
  </div>
  
  <div class="field">
    <span class="label">Email Address</span>
    <div class="value">${escapeHtml(submission.email)}</div>
  </div>
  
  <div class="field">
    <span class="label">Mobile Number</span>
    <div class="value">${submission.mobile ? escapeHtml(submission.mobile) : 'N/A'}</div>
  </div>
  
  <div class="field">
    <span class="label">Submission Date</span>
    <div class="value">${new Date(submission.created_at).toLocaleString()}</div>
  </div>
  
  <div class="field">
    <span class="label">Status</span>
    <div class="value">${escapeHtml(submission.status)}</div>
  </div>
  
  <div class="field">
    <span class="label">Message</span>
    <div class="message-box">${escapeHtml(submission.message).replace(/\n/g, '<br>')}</div>
  </div>
  
  <div class="footer">
    <p>This document was generated from Talent Trail Maps contact form submission system.</p>
    <p>Submission ID: ${submission.id}</p>
  </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact-${submission.name.replace(/\s+/g, '-')}-${submission.id}.html`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Downloaded',
      description: 'Contact submission downloaded as HTML (open in browser and print to PDF)'
    });
  };

  const downloadAsWord = (submission: ContactSubmission) => {
    const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="UTF-8">
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word">
  <meta name="Originator" content="Microsoft Word">
  <title>Contact Form Submission - ${escapeHtml(submission.name)}</title>
  <style>
    @page {
      size: 8.5in 11in;
      margin: 1in;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      margin: 0;
      padding: 40px;
      line-height: 1.6;
      color: #333;
    }
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #2563eb;
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .field {
      margin: 20px 0;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .label {
      font-weight: bold;
      color: #2563eb;
      display: inline-block;
      min-width: 150px;
      margin-right: 20px;
      font-size: 14px;
    }
    .value {
      color: #333;
      font-size: 15px;
      display: inline-block;
    }
    .message-box {
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      padding: 20px;
      margin-top: 20px;
      white-space: pre-wrap;
      word-wrap: break-word;
      border-left: 4px solid #2563eb;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 11px;
      color: #6b7280;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Contact Form Submission</h1>
    <p style="color: #6b7280; margin: 0;">Generated on ${new Date().toLocaleString()}</p>
  </div>
  
  <div class="field">
    <span class="label">Name:</span>
    <span class="value">${escapeHtml(submission.name)}</span>
  </div>
  
  <div class="field">
    <span class="label">Email Address:</span>
    <span class="value">${escapeHtml(submission.email)}</span>
  </div>
  
  <div class="field">
    <span class="label">Mobile Number:</span>
    <span class="value">${submission.mobile ? escapeHtml(submission.mobile) : 'N/A'}</span>
  </div>
  
  <div class="field">
    <span class="label">Submission Date:</span>
    <span class="value">${new Date(submission.created_at).toLocaleString()}</span>
  </div>
  
  <div class="field">
    <span class="label">Status:</span>
    <span class="value">${escapeHtml(submission.status)}</span>
  </div>
  
  <div>
    <div style="font-weight: bold; color: #2563eb; margin: 20px 0 10px 0;">Message:</div>
    <div class="message-box">${escapeHtml(submission.message).replace(/\n/g, '<br>')}</div>
  </div>
  
  <div class="footer">
    <p>This document was generated from Talent Trail Maps contact form submission system.</p>
    <p>Submission ID: ${submission.id}</p>
  </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact-${submission.name.replace(/\s+/g, '-')}-${submission.id}.doc`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded',
      description: 'Contact submission downloaded as Word document'
    });
  };

  const exportAllToJSON = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export successful',
      description: 'All contact submissions downloaded as JSON file'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Badge variant="default" className="gap-2">
              <Shield className="w-4 h-4" />
              Admin Panel
            </Badge>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    Contact Submissions
                  </CardTitle>
                  <CardDescription>
                    View and manage contact form submissions from users
                  </CardDescription>
                </div>
                {submissions.length > 0 && (
                  <Button onClick={exportAllToJSON} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export All as JSON
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No contact submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              {submission.name}
                            </div>
                          </TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.mobile || 'N/A'}</TableCell>
                          <TableCell className="max-w-md">
                            <div className="truncate" title={submission.message}>
                              {submission.message}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(submission.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <Download className="w-4 h-4" />
                                    Download
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => downloadAsJSON(submission)}>
                                    <FileJson className="w-4 h-4 mr-2" />
                                    Download as JSON
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => downloadAsPDF(submission)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download as PDF/Text
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => downloadAsWord(submission)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download as Word
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete the submission from ${submission.name}?`)) {
                                    deleteSubmission(submission.id);
                                  }
                                }}
                                className="gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
