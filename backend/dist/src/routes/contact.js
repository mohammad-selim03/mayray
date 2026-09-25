"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", contactController_1.submit);
router.get("/", auth_1.protect, contactController_1.getAll);
router.patch("/:id/status", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), contactController_1.updateStatus);
exports.default = router;
//# sourceMappingURL=contact.js.map