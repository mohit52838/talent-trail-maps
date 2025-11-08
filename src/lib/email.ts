/**
 * Email Notification Service
 * Sends email to admins when a contact form is submitted
 * 
 * SETUP INSTRUCTIONS:
 * 
 * Option 1: Using SendGrid (Recommended - Free tier: 100 emails/day)
 * 1. Sign up at https://sendgrid.com
 * 2. Create API key in Settings → API Keys
 * 3. Add to .env: VITE_EMAIL_API_KEY=your_sendgrid_api_key
 * 4. Add to .env: VITE_EMAIL_SERVICE=sendgrid
 * 
 * Option 2: Using MailerSend (Free tier: 12,000 emails/month)
 * 1. Sign up at https://www.mailersend.com
 * 2. Get API token from Settings → API Tokens
 * 3. Add to .env: VITE_EMAIL_API_KEY=your_mailersend_token
 * 4. Add to .env: VITE_EMAIL_SERVICE=mailersend
 * 
 * Option 3: Using Mailjet (Free tier: 6,000 emails/month)
 * 1. Sign up at https://www.mailjet.com
 * 2. Get API key and Secret key from Account Settings
 * 3. Add to .env: VITE_EMAIL_API_KEY=your_api_key
 * 4. Add to .env: VITE_EMAIL_SECRET=your_secret_key
 * 5. Add to .env: VITE_EMAIL_SERVICE=mailjet
 * 
 * Option 4: Using Supabase Edge Function (If you have Supabase)
 * 1. Deploy email function to Supabase
 * 2. Add to .env: VITE_SUPABASE_URL=your_supabase_url
 * 3. Add to .env: VITE_SUPABASE_ANON_KEY=your_anon_key
 */

// Admin email addresses
const ADMIN_EMAILS = [
  'mohitpatil52838@gmail.com',
  'rutuja.nav12@gmail.com',
  'smitapanse8@gmail.com',
  'krishparmar116@gmail.com',
];

// Default sender email - can be overridden by VITE_FROM_EMAIL env variable
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'mohitpatil52838@gmail.com';

/**
 * Send email notification to all admins about new form submission
 */
export const sendEmailNotification = async (
  submitterName: string,
  submitterEmail: string,
  submitterMobile: string,
  message: string
): Promise<void> => {
  const subject = 'New form submission on Elevare website';
  const emailBody = `A new form has been submitted on the Elevare website. Please check the Admin section for details.

Form Details:
- Name: ${submitterName}
- Email: ${submitterEmail}
- Mobile: ${submitterMobile}
- Message: ${message}

Submitted at: ${new Date().toLocaleString()}`;

  // Debug: Log environment variables (only in development)
  if (import.meta.env.DEV) {
    console.log('📧 Email Service Config:', {
      service: import.meta.env.VITE_EMAIL_SERVICE || 'not set',
      hasApiKey: !!import.meta.env.VITE_EMAIL_API_KEY,
      apiKeyLength: import.meta.env.VITE_EMAIL_API_KEY?.length || 0,
    });
  }

  try {
    // Option 1: Supabase Edge Function (Recommended - Secure, No CORS issues)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      try {
        console.log('📧 Sending email via Supabase Edge Function...');
        const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: ADMIN_EMAILS,
            from: FROM_EMAIL,
            subject: subject,
            body: emailBody,
            submitterName,
            submitterEmail,
            submitterMobile,
            message,
         }),
       });


        const result = await response.json();
        if (response.ok && result.success) {
          console.log('✅ Email sent successfully via SendGrid (Supabase)');
          console.log(`📧 Sent to ${result.recipients?.length || ADMIN_EMAILS.length} recipients`);
          return;
        } else {
          console.error('❌ Supabase email failed:', result);
          // Don't fall through to direct SendGrid - let user know to fix Supabase function
          throw new Error(result.error || 'Failed to send email via Supabase function');
        }
      } catch (supabaseError) {
        console.error('❌ Supabase email error:', supabaseError);
        // Don't fall through to direct SendGrid - Supabase should be the primary method
        throw supabaseError;
      }
    } else {
      console.warn('⚠️ Supabase URL or key not configured. Email cannot be sent securely.');
      throw new Error('Supabase configuration missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY');
    }

    // Note: Direct SendGrid API calls from browser are disabled for security
    // All emails should be sent through Supabase Edge Function
    // This ensures API keys stay secure on the backend

    // Option 3: MailerSend API
    if (emailApiKey && emailService === 'mailersend') {
      try {
        const response = await fetch('https://api.mailersend.com/v1/email', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${emailApiKey}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            from: {
              email: FROM_EMAIL,
              name: 'Elevare Website',
            },
            to: ADMIN_EMAILS.map(email => ({ email })),
            subject: subject,
            text: emailBody,
          }),
        });

        if (response.ok) {
          console.log('✅ Email sent successfully via MailerSend');
          return;
        } else {
          const error = await response.text();
          console.error('❌ MailerSend email failed:', response.status, error);
        }
      } catch (mailersendError) {
        console.error('❌ MailerSend error:', mailersendError);
      }
    }

    // Option 4: Mailjet API
    const emailSecret = import.meta.env.VITE_EMAIL_SECRET;
    if (emailApiKey && emailSecret && emailService === 'mailjet') {
      try {
        const credentials = btoa(`${emailApiKey}:${emailSecret}`);
        const response = await fetch('https://api.mailjet.com/v3.1/send', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Messages: [
              {
                From: {
                  Email: FROM_EMAIL,
                  Name: 'Elevare Website',
                },
                To: ADMIN_EMAILS.map(email => ({ Email: email })),
                Subject: subject,
                TextPart: emailBody,
              },
            ],
          }),
        });

        if (response.ok) {
          console.log('✅ Email sent successfully via Mailjet');
          return;
        } else {
          const error = await response.text();
          console.error('❌ Mailjet email failed:', response.status, error);
        }
      } catch (mailjetError) {
        console.error('❌ Mailjet error:', mailjetError);
      }
    }

    // Option 5: Webhook URL (for Zapier, Make.com, etc.)
    const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: ADMIN_EMAILS,
            from: FROM_EMAIL,
            subject: subject,
            body: emailBody,
            submitterName: submitterName,
            submitterEmail: submitterEmail,
            submitterMobile: submitterMobile,
            message: message,
          }),
        });

        if (response.ok) {
          console.log('✅ Email sent successfully via webhook');
          return;
        } else {
          console.error('❌ Webhook email failed:', response.status, response.statusText);
        }
      } catch (webhookError) {
        console.error('❌ Webhook error:', webhookError);
      }
    }

    // Fallback: Log for debugging
    console.warn('⚠️ Email service not configured. Email was not sent.');
    console.log('To enable email, configure one of:');
    console.log('1. VITE_EMAIL_SERVICE=sendgrid + VITE_EMAIL_API_KEY (for SendGrid)');
    console.log('2. VITE_EMAIL_SERVICE=mailersend + VITE_EMAIL_API_KEY (for MailerSend)');
    console.log('3. VITE_EMAIL_SERVICE=mailjet + VITE_EMAIL_API_KEY + VITE_EMAIL_SECRET (for Mailjet)');
    console.log('4. VITE_EMAIL_WEBHOOK_URL (for Zapier/Make.com webhooks)');
    console.log('5. VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (for Supabase Edge Function)');
    console.log('Email details:', {
      to: ADMIN_EMAILS,
      from: FROM_EMAIL,
      subject: subject,
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    // Don't throw - we don't want to block form submission if email fails
  }
};

