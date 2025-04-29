import Order from "../../models/order.model.js";

export const fetchAllOrdersByAdmin = async (req, res) => {
  try {
    const orders = await Order.find({});

    return res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "some error occurred while fetching orders",
      });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { orderid } = req.params;

    const order = await Order.findById(orderid);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found with id " });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetching orders",
      error,
    });
  }
};

export const updateOrderDetailsByAdmin = async (req, res) => {
  try {
    const { orderid } = req.params;

    const order = await Order.findById(orderid);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found with id " });
    }

    for (const key in updates) {
      if (!allowedUpdates.includes(key)) {
        return res.status(400).json({ message: `Invalid field: ${key}` });
      }

      const value = updates[key];
      const allowedUpdates = ["status", "paymentStatus", "addressInfo"];

      if (key === "status") {
        const allowedStatus = [
          "pending",
          "inProcess",
          "inShipping",
          "delivered",
          "rejected",
        ];
        if (!allowedStatus.includes(value)) {
          return res.status(400).json({ message: `Invalid status: ${value}` });
        }
      }

      if (key === "paymentStatus") {
        const allowedPaymentStatus = ["Paid", "Pending", "Failed"];
        if (!allowedPaymentStatus.includes(value)) {
          return res
            .status(400)
            .json({ message: `Invalid payment status: ${value}` });
        }
      }

      order.orderPrice = order.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await order.save();

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        order,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetching orders",
      error,
    });
  }
};
