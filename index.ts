// index.ts

import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Serverless Root</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 50px; }
        </style>
      </head>
      <body>
        <h1>🚀 Serverless Function Running!</h1>
        <p>You have successfully hit the root endpoint.</p>
      </body>
    </html>
  `);
}
