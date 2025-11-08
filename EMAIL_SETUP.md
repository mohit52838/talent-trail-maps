# 📧 Email Notification Setup Guide

This guide explains how to set up email notifications for contact form submissions.

## Admin Email Addresses

The following admins will receive email notifications:
- mohitpatil52838@gmail.com
- rutuja.nav12@gmail.com
- smitapanse8@gmail.com
- krishparmar116@gmail.com

## Email Details

- **Subject**: "New form submission on Elevare website"
- **Body**: "A new form has been submitted on the Elevare website. Please check the Admin section for details."
- **Includes**: Submitter's name, email, mobile number, and message

---

## 🚀 Quick Setup Options

### Option 1: SendGrid (Recommended - Easiest)

**Free Tier**: 100 emails/day forever

#### Step 1: Sign Up
1. Go to https://sendgrid.com
2. Click "Start for Free"
3. Sign up with your email
4. Verify your email address

#### Step 2: Create API Key
1. Go to Settings → API Keys
2. Click "Create API Key"
3. Name it: "Elevare Website"
4. Select "Full Access" or "Mail Send" permissions
5. Click "Create & View"
6. **COPY THE API KEY** (you won't see it again!)

#### Step 3: Verify Sender
1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in the form:
   - From Email: `noreply@elevare.com` (or your domain email)
   - From Name: Elevare
   - Reply To: `mohitpatil52838@gmail.com`
4. Verify the email sent to your inbox

#### Step 4: Add to Project
1. Create `.env` file in project root (if it doesn't exist)
2. Add these lines:
   ```
   VITE_EMAIL_SERVICE=sendgrid
   VITE_EMAIL_API_KEY=your_sendgrid_api_key_here
   ```
3. Replace `your_sendgrid_api_key_here` with the API key you copied

#### Step 5: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

#### Step 6: Test It!
1. Submit a contact form
2. Check admin email inboxes
3. Check browser console (F12) for confirmation

**Done!** ✅

---

### Option 2: MailerSend (Best Free Tier)

**Free Tier**: 12,000 emails/month

#### Step 1: Sign Up
1. Go to https://www.mailersend.com
2. Click "Start Free"
3. Sign up and verify email

#### Step 2: Get API Token
1. Go to Settings → API Tokens
2. Click "Create Token"
3. Name it: "Elevare Website"
4. Select "Email API" permissions
5. Click "Create Token"
6. **COPY THE TOKEN**

#### Step 3: Verify Domain (Optional but Recommended)
1. Go to Domains → Add Domain
2. Add your domain (or use subdomain)
3. Add DNS records as instructed
4. Wait for verification

#### Step 4: Add to Project
1. Add to `.env`:
   ```
   VITE_EMAIL_SERVICE=mailersend
   VITE_EMAIL_API_KEY=your_mailersend_token_here
   ```

2. Restart dev server

**Done!** ✅

---

### Option 3: Mailjet

**Free Tier**: 6,000 emails/month

#### Step 1: Sign Up
1. Go to https://www.mailjet.com
2. Click "Sign Up Free"
3. Complete registration

#### Step 2: Get API Credentials
1. Go to Account Settings → API Keys
2. You'll see:
   - API Key (Public)
   - Secret Key (Private)
3. **COPY BOTH**

#### Step 3: Add to Project
1. Add to `.env`:
   ```
   VITE_EMAIL_SERVICE=mailjet
   VITE_EMAIL_API_KEY=your_api_key_here
   VITE_EMAIL_SECRET=your_secret_key_here
   ```

2. Restart dev server

**Done!** ✅

---

### Option 4: Zapier Webhook (No Coding)

#### Step 1: Create Zapier Account
1. Go to https://zapier.com
2. Sign up (free tier available)

#### Step 2: Create Zap
1. Click "Create Zap"
2. **Trigger:**
   - Search "Webhooks by Zapier"
   - Choose "Catch Hook"
   - Copy the webhook URL

3. **Action:**
   - Search "Email" or "Gmail"
   - Choose "Send Email" or "Gmail: Send Email"
   - Set:
     - To: `mohitpatil52838@gmail.com, rutuja.nav12@gmail.com, smitapanse8@gmail.com, krishparmar116@gmail.com`
     - Subject: "New form submission on Elevare website"
     - Body: Use data from webhook

4. Turn on Zap

#### Step 3: Add to Project
1. Add to `.env`:
   ```
   VITE_EMAIL_WEBHOOK_URL=your_zapier_webhook_url_here
   ```

2. Restart dev server

**Done!** ✅

---

### Option 5: Supabase Edge Function (Most Secure)

If you're using Supabase, deploy the email function:

#### Step 1: Deploy Function
```bash
supabase functions deploy send-email
```

#### Step 2: Set Secrets
```bash
# For SendGrid
supabase secrets set SENDGRID_API_KEY=your_api_key

# OR for MailerSend
supabase secrets set MAILERSEND_API_KEY=your_token

# OR for Mailjet
supabase secrets set MAILJET_API_KEY=your_api_key
supabase secrets set MAILJET_SECRET=your_secret
```

#### Step 3: Add Supabase Credentials
1. Add to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Restart dev server

**Done!** ✅

---

## 📋 Environment Variables Summary

Add these to your `.env` file:

```bash
# Choose ONE email service:

# SendGrid
VITE_EMAIL_SERVICE=sendgrid
VITE_EMAIL_API_KEY=your_sendgrid_api_key

# OR MailerSend
VITE_EMAIL_SERVICE=mailersend
VITE_EMAIL_API_KEY=your_mailersend_token

# OR Mailjet
VITE_EMAIL_SERVICE=mailjet
VITE_EMAIL_API_KEY=your_mailjet_api_key
VITE_EMAIL_SECRET=your_mailjet_secret

# OR Webhook (Zapier)
VITE_EMAIL_WEBHOOK_URL=your_webhook_url

# OR Supabase (if using Supabase Edge Function)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## ✅ Testing

1. Submit a test contact form
2. Check browser console (F12) for:
   - `✅ Email sent successfully via [service]`
3. Check admin email inboxes:
   - mohitpatil52838@gmail.com
   - rutuja.nav12@gmail.com
   - smitapanse8@gmail.com
   - krishparmar116@gmail.com

---

## 🐛 Troubleshooting

**Email not sending?**
- Check browser console (F12) for errors
- Verify API key is correct
- Check email service account status
- Verify sender email is verified (for SendGrid)

**"Email service not configured" in console?**
- Make sure `.env` file exists in project root
- Verify variable names are correct (must start with `VITE_`)
- Restart dev server after adding `.env` variables

**API errors?**
- Check API key permissions
- Verify sender email is verified
- Check rate limits on free tier
- Review email service dashboard for errors

**Still not working?**
- Check email service status page
- Verify API credentials in service dashboard
- Check spam/junk folders
- Review browser console for detailed errors

---

## 📊 Service Comparison

| Service | Free Tier | Setup Difficulty | Best For |
|---------|-----------|------------------|----------|
| SendGrid | 100/day | ⭐ Easy | Quick setup |
| MailerSend | 12,000/month | ⭐⭐ Medium | High volume |
| Mailjet | 6,000/month | ⭐⭐ Medium | Balanced |
| Zapier | 100/month | ⭐ Easy | No coding |

---

## 🔒 Security Notes

- Never commit `.env` file to Git
- Keep API keys secret
- Use environment variables only
- For production, use Supabase Edge Function or backend API
- Rotate API keys periodically

---

## 💡 Tips

- **SendGrid**: Best for beginners, easy setup
- **MailerSend**: Best free tier (12k/month)
- **Mailjet**: Good balance of features
- **Zapier**: No coding required, visual setup
- **Supabase**: Most secure, keeps keys on backend

---

**Need help?** Check the browser console (F12) for detailed error messages!

