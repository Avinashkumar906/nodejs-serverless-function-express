// api/validateOrder.ts
import { withCors } from '../lib/withCors';
import crypto from 'crypto';

export default withCors(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(sign.toString())
    .digest('hex');

  if (razorpay_signature === expectedSign) {
    res.status(200).json({ valid: true });
  } else {
    res.status(400).json({ valid: false });
  }
});
