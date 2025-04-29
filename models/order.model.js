import { mongoose, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: String,
    cartItems: [
      {
        productId: String,
        title: String,
        quantity: Number,
        salePrice: Number,
        price: Number,
        image: String,
      },
    ],
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "not_shipped",
        "shipped",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "returned",
      ],
      default: "pending",
    },
    shippingHistory: [
      {
        status: String,
        updatedAt: Date,
      },
    ],
    orderPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      default: "razorpay",
    },
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema, "orders");

export default Order;
