import { Router } from "express";
import { submit, getAll, update } from "../controllers/healthCheckController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.post("/", submit);
router.get("/", protect, getAll);
router.patch("/:id", protect, restrictTo("admin"), update);

export default router;
