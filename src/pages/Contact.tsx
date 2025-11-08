import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, MessageSquare, User, Phone, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { sendEmailNotification } from '@/lib/email';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    // Validate mobile number (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      toast({
        title: 'Invalid mobile number',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const existing = JSON.parse(localStorage.getItem('contactForms') || '[]');
      const entry = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile.replace(/\D/g, ''), // Store only digits
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('contactForms', JSON.stringify([entry, ...existing]));

      // Send email notification to admins
      try {
        await sendEmailNotification(entry.name, entry.email, entry.mobile, entry.message);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('❌ Email notification failed:', emailError);
        // Don't block form submission if email fails
      }

      toast({
        title: 'Message sent!',
        description: 'We will get back to you soon.'
      });

      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-12 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Back to Home Button */}
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2 p-4 sm:p-6">
            <div className="flex justify-center">
              <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary to-secondary">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Get in Touch</CardTitle>
            <CardDescription className="text-base sm:text-lg px-2">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => {
                    // Only allow digits
                    const digits = e.target.value.replace(/\D/g, '');
                    if (digits.length <= 10) {
                      setFormData({ ...formData, mobile: digits });
                    }
                  }}
                  required
                  className="transition-all"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">Enter 10-digit mobile number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="transition-all resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
