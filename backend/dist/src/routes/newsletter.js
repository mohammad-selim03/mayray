"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletterController_1 = require("../controllers/newsletterController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/subscribe", newsletterController_1.subscribe);
router.post("/unsubscribe", newsletterController_1.unsubscribe);
router.get("/", auth_1.protect, newsletterController_1.getAll);
exports.default = router;
//# sourceMappingURL=newsletter.js.map