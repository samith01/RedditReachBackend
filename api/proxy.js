export default async function handler(req, res) {
    // Allow requests from your frontend domain
    res.setHeader('Access-Control-Allow-Origin', 'https://redditreach.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle pre-flight request
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send('URL parameter is required');
        }

        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                },
            });

            if (!response.ok) {
                return res.status(500).send('Error fetching content from target website');
            }

            const htmlContent = await response.text(); // Get HTML body
            res.send(htmlContent); // Return HTML content to the frontend
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching content');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}