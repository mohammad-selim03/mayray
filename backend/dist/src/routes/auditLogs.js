"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditLogController_1 = require("../controllers/auditLogController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.protect, (0, auth_1.restrictTo)("admin"), auditLogController_1.getAll);
exports.default = router;
//# sourceMappingURL=auditLogs.js.map