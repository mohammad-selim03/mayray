import { Router } from "express";
import { login, getMe, updatePassword } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.patch("/password", protect, updatePassword);

export default router;
