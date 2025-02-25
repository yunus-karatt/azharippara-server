import db from "../models/index.js";
import { hashPassword } from "../utils/authUtils.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, userName, password, verifyPassword } = req.body;

    if (!name || !userName || !password || !verifyPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== verifyPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await db.UserModel.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: "User Name already exists" });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = await db.UserModel.create({
      name,
      userName,
      password: hashedPassword,
      role: 1,
    });
    if (newUser) {
      const { password, ...userwithoutPassword } = newUser.get({ plain: true });
      return res.status(201).json({
        message: "User created successfully",
        user: userwithoutPassword,
      });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.error });
  }
};

export const blockAdmin = async (req, res) => {
  const { adminId } = req.params;
  const { isBlocked } = req.body;
  console.log({ adminId, isBlocked });
  try {
    const admin = await db.UserModel.findOne({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (isBlocked === undefined) {
      return res.status(400).json({
        message: "Action is required. Please specify 'block' or 'unblock'.",
      });
    }
    admin.isBlocked = isBlocked;
    await admin.save();
    return res.status(200).json({ message: `success` });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.error });
  }
};
