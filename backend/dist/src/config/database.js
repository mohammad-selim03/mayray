"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const connectDB = async () => {
    await prisma_1.default.$connect();
    console.log("Prisma connected to Supabase PostgreSQL");
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map