import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, apikey',
  'Access-Control-Max-Age': '86400',
};

// Admin email addresses
const ADMIN_EMAILS = [
  'mohitpatil52838@gmail.com',
  'rutuja.nav12@gmail.com',
  'smitapanse8@gmail.com',
  'krishparmar116@gmail.com',
];

// Default sender email - can be overridden by request or env variable
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'mohitpatil52838@gmail.com';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('📧 CORS preflight request received');
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  // Log incoming request details
  const origin = req.headers.get('origin') || 'unknown';
  console.log(`📧 Email request received: ${req.method} from ${origin}`);

  try {
    const { 
      to, 
      from, 
      subject, 
      body, 
      submitterName, 
      submitterEmail, 
      submitterMobile, 
      message 
    } = await req.json();

    // Use provided values or defaults
    const recipients = to || ADMIN_EMAILS;
    const sender = from || FROM_EMAIL;
    const emailSubject = subject || 'New form submission on Elevare website';
    
    // Build email body
    const emailBody = body || `A new form has been submitted on the Elevare website. Please check the Admin section for details.

Form Details:
- Name: ${submitterName || 'N/A'}
- Email: ${submitterEmail || 'N/A'}
- Mobile: ${submitterMobile || 'N/A'}
- Message: ${message || 'N/A'}

Submitted at: ${new Date().toLocaleString()}`;

    console.log(`📧 Preparing to send email from ${sender} to ${recipients.length} recipients`);

    // Get SendGrid API key from environment
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
    
    if (!sendgridApiKey) {
      console.error('❌ SENDGRID_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'SENDGRID_API_KEY not configured. Please set it in Supabase secrets.',
          details: 'Configure in Supabase dashboard → Project Settings → Edge Functions → Secrets'
        }),
        { 
          status: 500, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Send email via SendGrid API
    console.log('📧 Sending email via SendGrid API...');
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: recipients.map((email: string) => ({
          to: [{ email }],
        })),
        from: { 
          email: sender,
          name: 'Elevare Website'
        },
        subject: emailSubject,
        content: [
          {
            type: 'text/plain',
            value: emailBody,
          },
        ],
      }),
    });

    // Handle SendGrid response
    if (response.ok) {
      console.log('✅ Email sent successfully via SendGrid');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully via SendGrid (Supabase)',
          recipients: recipients,
          sender: sender
        }),
        { 
          status: 200, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    } else {
      // Log error details
      const errorText = await response.text();
      console.error(`❌ SendGrid API error: ${response.status} ${response.statusText}`);
      console.error(`❌ Error details: ${errorText}`);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Failed to send email via SendGrid',
          status: response.status,
          details: errorText
        }),
        { 
          status: response.status, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

  } catch (error) {
    console.error('❌ Error in send-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Check function logs for more information'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
