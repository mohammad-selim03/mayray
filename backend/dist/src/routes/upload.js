"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("../middleware/upload"));
const auth_1 = require("../middleware/auth");
const supabase_1 = __importDefault(require("../config/supabase"));
const router = (0, express_1.Router)();
router.post("/", auth_1.protect, upload_1.default.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const ext = path_1.default.extname(req.file.originalname);
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
        const { error } = await supabase_1.default.storage
            .from("mayray-assets")
            .upload(filename, req.file.buffer, { contentType: req.file.mimetype, upsert: false });
        if (error)
            throw error;
        const { data: { publicUrl } } = supabase_1.default.storage.from("mayray-assets").getPublicUrl(filename);
        res.json({ success: true, url: publicUrl, filename });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map