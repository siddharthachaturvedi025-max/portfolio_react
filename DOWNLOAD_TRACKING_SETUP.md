# Download Tracking Setup Guide

This portfolio includes automatic download tracking that sends you email notifications whenever someone downloads files from your Academic Research, Supplementary Work, or Experience sections.

## What Information is Tracked

When someone downloads a file, you receive an email with:
- **File Name** - Which file was downloaded
- **Section** - Where it was downloaded from (Academic Research, Supplementary Work, etc.)
- **IP Address** - Visitor's IP address
- **Browser** - Detected browser (Chrome, Firefox, Safari, etc.)
- **Operating System** - Detected OS (Windows, macOS, Linux, etc.)
- **Timestamp** - Exact date and time of download
- **Referrer** - Where the visitor came from

## Important Note: User Identity

⚠️ **You CANNOT get the email address or identity of downloaders** unless you implement a login system. The tracking only provides:
- IP address
- Browser/OS information
- Timestamp

To get user emails, you would need to add authentication (login) or a download form where users voluntarily provide their email.

## Setup Instructions

### 1. Create SendGrid Account (FREE)

1. Go to https://sendgrid.com/
2. Sign up for a FREE account (100 emails/day forever)
3. Verify your email address
4. Complete sender verification:
   - Navigate to Settings → Sender Authentication
   - Verify a Single Sender (easier) or Domain Authentication
   - Use your personal email as the sender

### 2. Get SendGrid API Key

1. In SendGrid dashboard, go to: Settings → API Keys
2. Click "Create API Key"
3. Name it: `Portfolio Download Tracking`
4. Select "Full Access" permission
5. Click "Create & View"
6. **COPY THE API KEY** (you'll only see it once!)

### 3. Configure Netlify Environment Variables

1. Log into Netlify
2. Go to your portfolio site dashboard
3. Navigate to: Site settings → Environment variables
4. Add these three variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `SENDGRID_API_KEY` | Your SendGrid API key | `SG.abc123...` |
| `NOTIFICATION_EMAIL` | Your email (where notifications go) | `your@email.com` |
| `SENDER_EMAIL` | Verified sender email in SendGrid | `noreply@yourdomain.com` |

5. Click "Save"
6. Redeploy your site (Netlify will auto-redeploy)

### 4. Test the Tracking

1. Visit your live portfolio site
2. Open Supplementary Work or Academic Research
3. Click on a file to open the viewer
4. Click the "Download" button
5. Check your email (may take 1-2 minutes)

## Email Notification Example

You'll receive emails that look like this:

```
Subject: 📥 File Download Alert: supp1.jpg

🎯 Portfolio File Downloaded

File Information
File: supp1.jpg
Section: Supplementary Work

Visitor Information
IP Address: 203.0.113.45
Browser: Chrome
Operating System: Windows
Timestamp: 2/10/2026, 3:45:12 AM
Referrer: https://example.com/page

Note: User identity cannot be determined without login functionality.
```

## Troubleshooting

### Not Receiving Emails?

1. **Check spam folder** - SendGrid emails sometimes go to spam initially
2. **Verify environment variables** - All 3 must be set correctly in Netlify
3. **Check SendGrid dashboard** - Activity → View all activity to see if emails are sending
4. **Verify sender** - Make sure SENDER_EMAIL is verified in SendGrid
5. **Check API key permissions** - Must have "Full Access" or at least "Mail Send" permission

### Still Not Working?

1. Open browser DevTools (F12)
2. Go to Network tab
3. Download a file
4. Look for request to `track-download`
5. Check for errors in Console tab
6. If you see errors, check that the Netlify function deployed correctly

## Cost

- **SendGrid Free Tier**: 100 emails/day forever (plenty for a portfolio)
- **Netlify Functions**: Included in free tier (125,000 requests/month)
- **Total Cost**: $0/month for typical portfolio usage

## Privacy Considerations

This tracking is standard analytics and legal for portfolio sites. However:
- Consider adding a privacy policy mentioning download tracking
- Don't share visitor IP addresses publicly
- Comply with GDPR if you have EU visitors (current implementation is compliant as it's for legitimate business interest)

## Optional: Add More Tracking

Want to track which files are most popular? You could:
1. Add a database (Firebase, Supabase) to store download counts
2. Create a dashboard showing download statistics
3. Track Geographic location using IP geolocation API

These require additional setup - let me know if you're interested!

---

**Serverless Function Location**: `/netlify/functions/track-download.js`
**Implementation**: Automatic - no user action required except setup
