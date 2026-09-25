import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/usersController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.use(protect, restrictTo("admin"));
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
