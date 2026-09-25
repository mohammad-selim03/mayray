"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    let status = err.statusCode ?? 500;
    let message = err.message ?? "Internal Server Error";
    if (err.name === "CastError") {
        status = 400;
        message = "Invalid ID format";
    }
    if (err.code === 11000 && err.keyValue) {
        status = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }
    if (err.name === "ValidationError" && err.errors) {
        status = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");
    }
    if (process.env.NODE_ENV === "development")
        console.error(err);
    res.status(status).json({ success: false, message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map