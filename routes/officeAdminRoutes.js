import { Router } from "express";
import { officeAdminLogin } from "../controllers/officeAdminAuthController.js";

const router = Router();

router.post("/login", officeAdminLogin);

export default router;
