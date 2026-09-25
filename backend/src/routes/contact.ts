import { Router } from "express";
import { submit, getAll, updateStatus } from "../controllers/contactController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.post("/", submit);
router.get("/", protect, getAll);
router.patch("/:id/status", protect, restrictTo("admin", "editor"), updateStatus);

export default router;
