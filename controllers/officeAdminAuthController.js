import db from "../models/index.js";
import { comparePassword } from "../utils/authUtils.js";

import jwt from "jsonwebtoken";

export const officeAdminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await db.UserModel.findOne({ where: { userName } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    if (user.role !== 2) {
      return res
        .status(401)
        .json({ error: "Authentication failed. No office admin privilage" });
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
