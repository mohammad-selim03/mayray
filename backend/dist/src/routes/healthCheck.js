"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthCheckController_1 = require("../controllers/healthCheckController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", healthCheckController_1.submit);
router.get("/", auth_1.protect, healthCheckController_1.getAll);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), healthCheckController_1.update);
exports.default = router;
//# sourceMappingURL=healthCheck.js.map