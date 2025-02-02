import db from "../models/index.js";
import { hashPassword } from "../utils/authUtils.js";

export const createOfficeAdmin = async (req, res) => {
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
    return res.status(500).json({ error: error });
  }
};
