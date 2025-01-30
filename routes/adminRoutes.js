import { Router } from "express";
import { adminLogin, adminSignup } from "../controllers/adminAuthController.js";
import { createAdmin } from "../controllers/adminManageAdminController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/add/admin", verifyToken,createAdmin);

export default router;
