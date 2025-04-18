import mongoose from "mongoose";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";

export const addToCart = async (req, res) => {
  console.log("adding to cart");
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "user id not found",
      });
    }
    const { productId, quantity } = req.body;
    console.log({ userId, productId, quantity });
    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const findCurrentProductIndex = cart.items.findIndex((item) => {
      console.log("item", item.productId, productId);
      return (
        item.productId &&
        (item.productId._id?.toString() || item.productId.toString()) ===
          productId
      );
    });

    console.log(findCurrentProductIndex);
    console.log(cart.items);

    if (findCurrentProductIndex > -1) {
      cart.items[findCurrentProductIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    console.log("cart before save", { cart });

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "user id not found",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => {
      return {
        product: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        brand: item.productId.brand,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      // data: { ...cart._doc, populateCartItems },
      data: { cart: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Fetching to cart",
    });
  }
};

export const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId, productId, quantity);
    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart items updated successfully",
      data: { success: true },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating to cart",
    });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice brand",
    });

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting to cart",
    });
  }
};
