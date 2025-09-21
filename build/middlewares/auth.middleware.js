"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
// middleware/authenticate.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const authenticate = async (req, res, next) => {
    let token;
    let tokenSource;
    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        tokenSource = "header";
    }
    else if (req.cookies['token']) {
        token = req.cookies['token'];
        tokenSource = "cookie";
    }
    // console.log({ tokenSource });
    if (!token) {
        return res.status(401).send(new apiError_1.ApiError(401, "Authentication token is required"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET'] || "fallback_secret");
        if (!decoded) {
            return res.status(403).send(new apiError_1.ApiError(403, "Invalid token payload"));
        }
        req.user = decoded; // ✅ Now `req.user` is fully typed
        next();
    }
    catch {
        return res.status(403).send(new apiError_1.ApiError(403, "Invalid or expired token"));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map