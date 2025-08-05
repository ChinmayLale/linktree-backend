"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwtToken = async ({ user }) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    const tokenSecret = process.env['JWT_SECRET'] || "acgatfg9uqtfbyquyq9b8fgqn879y"; // fallback
    if (!tokenSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign(payload, tokenSecret, {
        expiresIn: "7d", // optional: you can customize token validity
    });
    return token;
};
exports.createJwtToken = createJwtToken;
//# sourceMappingURL=jwt.service.js.map