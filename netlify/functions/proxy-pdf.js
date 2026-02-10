/**
 * Netlify serverless function to proxy PDF downloads from Google Drive
 * This bypasses CORS restrictions by fetching PDFs server-side
 */
exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get the file ID from query parameters
    const fileId = event.queryStringParameters?.id;

    if (!fileId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'File ID is required' })
        };
    }

    try {
        // Fetch the PDF from Google Drive
        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

        const response = await fetch(driveUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        // Get the PDF data as ArrayBuffer
        const pdfData = await response.arrayBuffer();

        // Return the PDF with proper headers
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
            },
            body: Buffer.from(pdfData).toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('Error proxying PDF:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to fetch PDF',
                message: error.message
            })
        };
    }
};
