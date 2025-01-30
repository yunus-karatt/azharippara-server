import { UserModel } from "../postgres/postgres.js";
import { hashPassword } from "../utils/authUtils.js";

export const createAdmin = async (req, res) => {
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
    if (newUser) {
      const { password, ...userwithoutPassword } = newUser.get({ plain: true });
      return res
        .status(201)
        .json({
          message: "User created successfully",
          user: userwithoutPassword,
        });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.error });
  }
};
