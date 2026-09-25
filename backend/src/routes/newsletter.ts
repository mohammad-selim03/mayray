import { Router } from "express";
import { subscribe, unsubscribe, getAll } from "../controllers/newsletterController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.get("/", protect, getAll);

export default router;
