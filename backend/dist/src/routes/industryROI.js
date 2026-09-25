"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const industryROIController_1 = require("../controllers/industryROIController");
const router = (0, express_1.Router)();
router.get("/", industryROIController_1.listROI);
router.get("/admin", auth_1.protect, industryROIController_1.getROMAdmin);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), industryROIController_1.createROI);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), industryROIController_1.reorderROI);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), industryROIController_1.updateROI);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), industryROIController_1.deleteROI);
exports.default = router;
//# sourceMappingURL=industryROI.js.map