import { Router } from "express";
import { protect, restrictTo } from "../middleware/auth";
import {
  listROI,
  getROMAdmin,
  createROI,
  updateROI,
  deleteROI,
  reorderROI,
} from "../controllers/industryROIController";

const router = Router();

router.get("/", listROI);
router.get("/admin", protect, getROMAdmin);

router.post("/", protect, restrictTo("admin", "editor"), createROI);
router.post("/reorder", protect, restrictTo("admin", "editor"), reorderROI);

router.patch("/:id", protect, restrictTo("admin", "editor"), updateROI);
router.delete("/:id", protect, restrictTo("admin"), deleteROI);

export default router;
