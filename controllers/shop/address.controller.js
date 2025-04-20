import { Address } from "../../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { address, city, pincode, phone, notes } = req.body;
    console.log(req.body);
    const userId = req.user.id;
    console.log(userId, address, city, pincode, phone, notes);

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("passed");
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({
      message: "Address added successfully",
      newAddress,
      success: true,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchAllAddress = async (req, res) => {
  console.log("triggered fetchAllAddress");
  try {
    const { id } = req.user;

    const userId = id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const addresses = await Address.find({ userId });

    if (addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!addressId) {
      return res.status(400).json({ message: "Address ID is required" });
    }

    const address = await Address.findById(addressId).where({ userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const { address, city, pincode, phone, notes } = req.body;

    console.log(address);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!addressId) {
      return res.status(400).json({ message: "Address ID is required" });
    }

    if (!address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { address, city, pincode, phone, notes },
      { new: true }
    ).where({ userId });

    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found with provided user id and address id",
      });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  try {
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!addressId) {
      return res.status(400).json({ message: "Address ID is required" });
    }

    const deletedAddress = await Address.findByIdAndDelete(addressId).where({
      userId,
    });

    console.log(deletedAddress);

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found with provided user id and address id",
      });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
