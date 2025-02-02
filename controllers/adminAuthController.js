import { comparePassword, hashPassword } from "../utils/authUtils.js";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
export const adminSignup = async (req, res) => {
  try {
    const { name, userName, password, verifyPassword } = req.body;

    if (!name || !userName || !password || !verifyPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== verifyPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await db.db.UserModel.findOne({ where: { userName } });
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
export const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await db.UserModel.findOne({ where: { userName } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    if (user.role !== 1) {
      return res
        .status(401)
        .json({ error: "Authentication failed. No admin privilage" });
    }
    if (user.isBlocked) {
      return res.status(401).json({ error: "you are blocked this time" });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7D",
      }
    );
    if (token) {
      const { password, ...userWithoutPassword } = user.get({ plain: true });
      return res.status(200).json({ token, user: userWithoutPassword });
    }
    return res.status(401).json({ error: "Authentication failed" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};
