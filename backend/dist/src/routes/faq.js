"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faqController_1 = require("../controllers/faqController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", faqController_1.getAll);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), faqController_1.reorder);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), faqController_1.create);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), faqController_1.update);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), faqController_1.remove);
exports.default = router;
//# sourceMappingURL=faq.js.map