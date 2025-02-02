import { Router } from "express";
import { adminLogin, adminSignup } from "../controllers/adminAuthController.js";
import {
  blockAdmin,
  createAdmin,
} from "../controllers/adminManageAdminController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { createOfficeAdmin } from "../controllers/adminManageOfficeAdmin.js";

const router = Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/add/admin", verifyToken, adminMiddleware, createAdmin);
router.patch("/block/admin/:adminId", verifyToken, adminMiddleware, blockAdmin);

// managing office admin

router.post(
  "/add/office-admin",
  verifyToken,
  adminMiddleware,
  createOfficeAdmin
);

export default router;
