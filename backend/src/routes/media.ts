import { Router } from "express";
import { completeUpload, createUpload, deleteMedia, listMedia, updateMedia } from "../controllers/mediaController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.use(protect);
router.get("/", listMedia);
router.post("/uploads", restrictTo("admin"), createUpload);
router.post("/", restrictTo("admin"), completeUpload);
router.patch("/:id", restrictTo("admin"), updateMedia);
router.delete("/:id", restrictTo("admin"), deleteMedia);

export default router;
