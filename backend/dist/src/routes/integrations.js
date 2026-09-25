"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const integrationsController_1 = require("../controllers/integrationsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", integrationsController_1.getAll);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin"), integrationsController_1.reorder);
router.get("/:id", integrationsController_1.getOne);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin"), integrationsController_1.create);
router.patch("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), integrationsController_1.update);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), integrationsController_1.remove);
exports.default = router;
//# sourceMappingURL=integrations.js.map