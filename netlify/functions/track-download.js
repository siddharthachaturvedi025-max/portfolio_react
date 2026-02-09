// Netlify serverless function for download tracking
// Sends email notification when files are downloaded

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { fileName, section } = JSON.parse(event.body);

        // Get user information
        const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'Unknown';
        const userAgent = event.headers['user-agent'] || 'Unknown';
        const timestamp = new Date().toISOString();
        const referer = event.headers['referer'] || 'Direct';

        // Parse browser info from user agent
        const getBrowserInfo = (ua) => {
            if (ua.includes('Chrome')) return 'Chrome';
            if (ua.includes('Firefox')) return 'Firefox';
            if (ua.includes('Safari')) return 'Safari';
            if (ua.includes('Edge')) return 'Edge';
            return 'Unknown';
        };

        const getOSInfo = (ua) => {
            if (ua.includes('Windows')) return 'Windows';
            if (ua.includes('Mac')) return 'macOS';
            if (ua.includes('Linux')) return 'Linux';
            if (ua.includes('Android')) return 'Android';
            if (ua.includes('iOS')) return 'iOS';
            return 'Unknown';
        };

        const browser = getBrowserInfo(userAgent);
        const os = getOSInfo(userAgent);

        // Email notification payload
        const emailData = {
            to: process.env.NOTIFICATION_EMAIL, // Your email
            from: process.env.SENDER_EMAIL || 'noreply@portfolio.com',
            subject: `📥 File Download Alert: ${fileName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #8BC34A; margin-top: 0;">🎯 Portfolio File Downloaded</h2>
            
            <div style="background: #f9f9f9; border-left: 4px solid #8BC34A; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">File Information</h3>
              <p style="margin: 8px 0;"><strong>File:</strong> ${fileName}</p>
              <p style="margin: 8px 0;"><strong>Section:</strong> ${section}</p>
            </div>

            <div style="background: #f9f9f9; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Visitor Information</h3>
              <p style="margin: 8px 0;"><strong>IP Address:</strong> ${ip}</p>
              <p style="margin: 8px 0;"><strong>Browser:</strong> ${browser}</p>
              <p style="margin: 8px 0;"><strong>Operating System:</strong> ${os}</p>
              <p style="margin: 8px 0;"><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Referrer:</strong> ${referer}</p>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 0.9rem; color: #856404;">
                <strong>Note:</strong> This is an automated notification from your portfolio website. 
                User identity cannot be determined without login functionality.
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="font-size: 0.85rem; color: #999; margin-bottom: 0;">
              Full User Agent: <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 0.8rem;">${userAgent}</code>
            </p>
          </div>
        </div>
      `
        };

        // Send email using SendGrid API
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

        if (!SENDGRID_API_KEY) {
            console.error('SendGrid API key not configured');
            // Still return success to not break user experience
            return {
                statusCode: 200,
                body: JSON.stringify({ tracked: false, message: 'Tracking not configured' })
            };
        }

        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: emailData.to }]
                }],
                from: { email: emailData.from },
                subject: emailData.subject,
                content: [{
                    type: 'text/html',
                    value: emailData.html
                }]
            })
        });

        if (!response.ok) {
            console.error('SendGrid error:', await response.text());
            return {
                statusCode: 200,
                body: JSON.stringify({ tracked: false, message: 'Email service error' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                tracked: true,
                message: 'Download tracked successfully',
                timestamp
            })
        };

    } catch (error) {
        console.error('Error tracking download:', error);
        return {
            statusCode: 200, // Return 200 to not break user experience
            body: JSON.stringify({ tracked: false, error: error.message })
        };
    }
};
