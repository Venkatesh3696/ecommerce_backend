import { configDotenv } from "dotenv";
import Razorpay from "razorpay";

configDotenv();

const options = {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
  currency: "INR",
};

export const instance = new Razorpay(options);

export default instance;
