"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonialsController_1 = require("../controllers/testimonialsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", testimonialsController_1.getAll);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), testimonialsController_1.reorder);
router.get("/:id", auth_1.protect, testimonialsController_1.getOne);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), testimonialsController_1.create);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), testimonialsController_1.update);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), testimonialsController_1.remove);
exports.default = router;
//# sourceMappingURL=testimonials.js.map