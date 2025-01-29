import { UserModel } from "../postgres/postgres.js";
import { hashPassword } from "../utils/authUtils.js";

export const adminSignup = async (req, res) => {
  try {
    const { name, userName, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: "User Name already exists" });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      name,
      userName,
      password: hashedPassword,
      role: 1,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.error });
  }
};
export const adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    return res.status(200).json({ hashedPassword });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};
