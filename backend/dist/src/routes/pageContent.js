"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageContentController_1 = require("../controllers/pageContentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/:page", pageContentController_1.getByPage);
router.get("/:page/admin", auth_1.protect, pageContentController_1.getByPageAdmin);
router.post("/", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), pageContentController_1.upsert);
router.post("/bulk", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), pageContentController_1.bulkUpsert);
router.post("/reorder", auth_1.protect, (0, auth_1.restrictTo)("admin", "editor"), pageContentController_1.reorder);
router.delete("/:id", auth_1.protect, (0, auth_1.restrictTo)("admin"), pageContentController_1.remove);
exports.default = router;
//# sourceMappingURL=pageContent.js.map