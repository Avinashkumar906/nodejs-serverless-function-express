import type { VercelRequest, VercelResponse } from '@vercel/node'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // // 🛡️ Add these CORS headers
  // res.setHeader('Access-Control-Allow-Origin', '*') // or specify your domain
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // // 👀 Handle preflight request
  // if (req.method === 'OPTIONS') {
  //   return res.status(200).end()
  // }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = req.body

    const options = {
      amount: amount * 100,
      currency,
      receipt,
    }

    const order = await razorpay.orders.create(options)
    res.status(200).json(order)
  } catch (err) {
    console.error('Razorpay Error:', err)
    res.status(500).json({ error: 'Failed to create Razorpay order' })
  }
}

// curl -X POST https://h4zp.vercel.app/api/createOrder \
//   -H "Content-Type: application/json" \
//   -d '{"amount": 500}'
