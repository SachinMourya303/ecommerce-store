import express from 'express';
import Razorpay from 'razorpay';

const paymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.TEST_KEY_ID,      // backend secret
  key_secret: process.env.TEST_KEY_SECRET,
});

paymentRouter.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: Number(amount) * 100, // Razorpay expects amount in paise
    currency: currency || 'INR',
    receipt: 'receipt_order_' + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default paymentRouter;
