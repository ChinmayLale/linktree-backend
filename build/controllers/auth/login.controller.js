"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const apiError_1 = require("../../utils/apiError");
const apiResponse_1 = require("../../utils/apiResponse");
const client_1 = require("@prisma/client");
const db_config_1 = require("../../db/db.config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_service_1 = require("../../services/jwt.service");
const loginController = async (req, res, next) => {
    try {
        const { email, provider, password } = req.body; // Assuming user data is sent in the request body
        if (!email || !provider) {
            throw new apiError_1.ApiError(400, "Email and provider are required for login");
        }
        // Check if the user exists
        const user = await db_config_1.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            console.log("User not found for email:", email);
            throw new apiError_1.ApiError(404, "User not found");
        }
        if (!(user.provider === provider)) {
            console.log("User provider mismatch:", user.provider, provider);
            throw new apiError_1.ApiError(400, `User is registered with ${user.provider?.toLowerCase()} provider, cannot login with ${provider} provider`);
        }
        if (user.provider === client_1.AuthProvider.CREDENTIALS.toString() && provider === client_1.AuthProvider.CREDENTIALS.toString()) {
            // Handle password logic for CREDENTIALS provider
            if (!password || password.trim() === "") {
                throw new apiError_1.ApiError(400, "Password is required for credentials login");
            }
            // Verify Password
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password || "");
            if (!isPasswordValid) {
                throw new apiError_1.ApiError(401, "Invalid credentials");
            }
        }
        // Create JWT Token
        const payload = {
            id: user.id,
            email: user.email,
            provider: user.provider
        };
        const token = await (0, jwt_service_1.createJwtToken)({ user: payload });
        if (!token) {
            throw new apiError_1.ApiError(500, "Failed to create JWT token");
        }
        // Prepare user data for response
        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            bio: user.bio,
            token: token,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        };
        // Send response
        return res.cookie('username', user.username, options).cookie('token', token, options).status(200).send(new apiResponse_1.ApiResponse(200, "Login successful", userData));
    }
    catch (error) {
        console.log({ error });
        next(error);
    }
};
exports.loginController = loginController;
//# sourceMappingURL=login.controller.js.map