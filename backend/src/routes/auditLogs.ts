import { Router } from "express";
import { getAll } from "../controllers/auditLogController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/", protect, restrictTo("admin"), getAll);

export default router;
