// index.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Serverless Root</title>
          <style>
            body {
              font-family: sans-serif;
              text-align: center;
              margin: 50px;
            }
          </style>
        </head>
        <body>
          <h1>🚀 Serverless Function Running</h1>
          <p>This page is rendered directly from <strong>index.ts</strong></p>
        </body>
      </html>
    `);
}
