# 🚀 Deploy Email Function - Quick Guide

## ✅ Changes Made

1. **Fixed CORS** - Added proper CORS headers to allow requests from:
   - `http://localhost:8080`
   - `https://elevareweb.netlify.app`
   - Any origin (`*`)

2. **Secure Backend Routing** - All emails now go through Supabase Edge Function instead of browser

3. **Environment Variables** - Function uses `SENDGRID_API_KEY` from Supabase secrets

## 📋 Deployment Steps

### Step 1: Set Supabase Secrets

Set the SendGrid API key in Supabase:

```bash
supabase secrets set SENDGRID_API_KEY=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
```

Optional (if you want to override defaults):
```bash
supabase secrets set FROM_EMAIL=mohitpatil52838@gmail.com
```

### Step 2: Deploy the Function

```bash
supabase functions deploy send-email
```

### Step 3: Verify Deployment

Check Supabase dashboard:
1. Go to **Edge Functions** → **send-email**
2. Verify it's deployed and active
3. Check logs for any errors

### Step 4: Restart Frontend Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ Testing

1. **Submit a contact form**
2. **Check browser console (F12)** for:
   - `📧 Sending email via Supabase Edge Function...`
   - `✅ Email sent successfully via SendGrid (Supabase)`
   - `📧 Sent to 4 recipients`

3. **Check all 4 admin email inboxes**:
   - mohitpatil52838@gmail.com
   - rutuja.nav12@gmail.com
   - smitapanse8@gmail.com
   - krishparmar116@gmail.com

## 🐛 Troubleshooting

### CORS Errors
- ✅ Fixed! Function now includes proper CORS headers
- If still seeing CORS errors, check browser console for exact error

### "SENDGRID_API_KEY not configured"
- Run: `supabase secrets set SENDGRID_API_KEY=your_key_here`
- Redeploy: `supabase functions deploy send-email`

### Function Not Found (404)
- Make sure function is deployed: `supabase functions deploy send-email`
- Check function name matches: `send-email` (with hyphen)

### Email Not Sending
- Check Supabase function logs in dashboard
- Verify SendGrid API key is correct
- Check if sender email is verified in SendGrid

## 📧 Email Details

- **From**: mohitpatil52838@gmail.com
- **To**: All 4 admin emails
- **Subject**: "New form submission on Elevare website"
- **Body**: Includes submitter's name, email, mobile, and message

## 🔒 Security Benefits

✅ API key stays on backend (never exposed to browser)
✅ No CORS issues (proper headers configured)
✅ Centralized email sending logic
✅ Better error handling and logging

---

**Ready to deploy! Run the commands above and test it!** 🎉

