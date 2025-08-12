// lib/withCors.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export function withCors(
  handler: (req: VercelRequest, res: VercelResponse) => void | Promise<void>
) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return; // End early for preflight
    }

    await handler(req, res);
  };
}
