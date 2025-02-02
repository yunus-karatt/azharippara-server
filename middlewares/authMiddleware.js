import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
