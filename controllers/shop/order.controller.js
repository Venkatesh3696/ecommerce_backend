import { Order } from "../../models/order.model.js";

export const createNewOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderPrice,
    } = req.body;

    if (
      !userId ||
      !cartItems ||
      !addressInfo ||
      !orderStatus ||
      !paymentMethod ||
      !paymentStatus ||
      !orderPrice
    ) {
      return res.status(300).json({
        success: false,
        message: "please Provide all fields in req body",
      });
    }

    const newOrder = await Order.create({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderPrice,
    });

    return res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: error.message, errors: error.errors });
    }
    console.log("error in controller catch", error),
      res.status(500).json({
        success: false,
        message: "some error occured in order creation",
        error,
      });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId });

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

export const getOrderDetails = async (req, res) => {
  try {
    const { orderid } = req.params;

    const orders = await Order.findById(orderid);

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found with id " });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occurred while fetching orders",
      error,
    });
  }
};

export const updateShoppingOrder = async (req, res) => {
  try {
    const { orderid } = req.params;

    const { ...updates } = req.body;

    console.log("updating order", orderid, updates);

    const updatedOrder = await Order.findByIdAndUpdate(orderid, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Orders updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "some error occurred while updating orders",
      });
  }
};
