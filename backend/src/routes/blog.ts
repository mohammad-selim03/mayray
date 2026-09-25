import { Router } from "express";
import { getPublished, getAll, getOne, getBySlug, trackView, create, update, remove } from "../controllers/blogController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/", getPublished);
router.get("/admin", protect, getAll);
router.get("/slug/:slug", getBySlug);
router.get("/:id", getOne);
router.post("/:id/view", trackView);
router.post("/", protect, restrictTo("admin", "editor"), create);
router.patch("/:id", protect, restrictTo("admin", "editor"), update);
router.delete("/:id", protect, restrictTo("admin"), remove);

export default router;
