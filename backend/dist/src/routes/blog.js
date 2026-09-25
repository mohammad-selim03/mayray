"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", blogController_1.getPublished);
router.get("/admin", auth_1.protect, blogController_1.getAll);
router.get("/slug/:slug", blogController_1.getBySlug);
router.get("/:id", blogController_1.getOne);
router.post("/:id/view", blogController_1.trackView);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), blogController_1.create);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), blogController_1.update);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), blogController_1.remove);
exports.default = router;
//# sourceMappingURL=blog.js.map