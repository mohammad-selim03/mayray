import { Router } from "express";
import { getDocument, listDocuments, listVersions, restoreVersion, saveDocument } from "../controllers/cmsController";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/documents", protect, listDocuments);
router.get("/documents/:key", getDocument);
router.put("/documents/:key", protect, restrictTo("admin"), saveDocument);
router.get("/documents/:key/versions", protect, listVersions);
router.post("/documents/:key/versions/:versionId/restore", protect, restrictTo("admin"), restoreVersion);

export default router;
