"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/overview", auth_1.protect, analyticsController_1.getOverview);
router.get("/blogs", auth_1.protect, analyticsController_1.getBlogStats);
router.get("/contacts", auth_1.protect, analyticsController_1.getContactStats);
exports.default = router;
//# sourceMappingURL=analytics.js.map