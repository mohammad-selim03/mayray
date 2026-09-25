import { Router } from "express";
import { getOverview, getBlogStats, getContactStats } from "../controllers/analyticsController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/overview", protect, getOverview);
router.get("/blogs", protect, getBlogStats);
router.get("/contacts", protect, getContactStats);

export default router;
