import { Router } from "express";
import { getByPage, getByPageAdmin, upsert, bulkUpsert, reorder, remove } from "../controllers/pageContentController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/:page", getByPage);
router.get("/:page/admin", protect, getByPageAdmin);
router.post("/", protect, restrictTo("admin", "editor"), upsert);
router.post("/bulk", protect, restrictTo("admin", "editor"), bulkUpsert);
router.post("/reorder", protect, restrictTo("admin", "editor"), reorder);
router.delete("/:id", protect, restrictTo("admin"), remove);

export default router;
