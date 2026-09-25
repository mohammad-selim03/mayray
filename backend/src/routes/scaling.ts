import { Router } from "express";
import { getAll, create, update, remove, reorder } from "../controllers/scalingController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/", getAll);
router.post("/reorder", protect, restrictTo("admin", "editor"), reorder);
router.post("/", protect, restrictTo("admin", "editor"), create);
router.patch("/:id", protect, restrictTo("admin", "editor"), update);
router.delete("/:id", protect, restrictTo("admin"), remove);

export default router;
