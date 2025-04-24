import { configDotenv } from "dotenv";
import Razorpay from "razorpay";
configDotenv();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
  currency: "INR",
  name: "venkatesh pentakota",
  description: "Test Transaction for the product purchase",
  theme: {
    color: "#F37254",
  },
});

export default instance;
