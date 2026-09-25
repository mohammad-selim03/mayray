import { Router } from "express";
import { getAll, getOne, create, update, remove, reorder } from "../controllers/integrationsController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/", getAll);
router.post("/reorder", protect, restrictTo("admin"), reorder);
router.get("/:id", getOne);
router.post("/", protect, restrictTo("admin"), create);
router.patch("/:id", protect, restrictTo("admin"), update);
router.delete("/:id", protect, restrictTo("admin"), remove);

export default router;
