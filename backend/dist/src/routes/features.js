"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const featuresController_1 = require("../controllers/featuresController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", featuresController_1.getAll);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), featuresController_1.reorder);
router.get("/:id", featuresController_1.getOne);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), featuresController_1.create);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), featuresController_1.update);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), featuresController_1.remove);
exports.default = router;
//# sourceMappingURL=features.js.map