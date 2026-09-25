"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect, (0, auth_1.restrictTo)("admin"));
router.get("/", usersController_1.getAll);
router.get("/:id", usersController_1.getOne);
router.post("/", usersController_1.create);
router.patch("/:id", usersController_1.update);
router.delete("/:id", usersController_1.remove);
exports.default = router;
//# sourceMappingURL=users.js.map