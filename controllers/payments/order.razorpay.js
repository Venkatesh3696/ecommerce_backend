import instance from "../../config/razorpay.js";
import crypto from "crypto";
import Order from "../../models/order.model.js";

export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentOrder = await instance.orders.create(options);
    // console.log({ order });

    res.status(200).json({
      ...paymentOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create Razorpay order", err });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // console.log({ sign, razorpay_signature });

  if (sign !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  res.status(200).json({ message: "Payment verified and order placed" });
};
