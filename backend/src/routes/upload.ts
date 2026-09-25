import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import upload from "../middleware/upload";
import { protect } from "../middleware/auth";
import supabase from "../config/supabase";

const router = Router();

router.post("/", protect, upload.single("file"), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) { res.status(400).json({ success: false, message: "No file uploaded" }); return; }

    const ext = path.extname(req.file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    const { error } = await supabase.storage
      .from("mayray-assets")
      .upload(filename, req.file.buffer, { contentType: req.file.mimetype, upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from("mayray-assets").getPublicUrl(filename);
    res.json({ success: true, url: publicUrl, filename });
  } catch (err) {
    next(err);
  }
});

export default router;
