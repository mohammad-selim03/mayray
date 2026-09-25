import { Router } from "express";
import { getAll, updateMany } from "../controllers/settingsController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/", getAll);
router.patch("/", protect, restrictTo("admin", "editor"), updateMany);

export default router;
