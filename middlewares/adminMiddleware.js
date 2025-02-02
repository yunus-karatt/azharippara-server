export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 1) {
    return res.status(403).json({ error: "Access Denied. Admin only" });
  }
  next();
};
