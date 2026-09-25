"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./src/app"));
const database_1 = __importDefault(require("./src/config/database"));
const scheduler_1 = require("./src/utils/scheduler");
const PORT = parseInt(process.env.PORT ?? "5000", 10);
(0, database_1.default)().then(() => {
    (0, scheduler_1.startScheduler)();
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map