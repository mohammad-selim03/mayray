"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../controllers/settingsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", settingsController_1.getAll);
router.patch("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), settingsController_1.updateMany);
exports.default = router;
//# sourceMappingURL=settings.js.map