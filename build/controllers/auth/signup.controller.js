"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const db_config_1 = require("../../db/db.config");
const jwt_service_1 = require("../../services/jwt.service");
const apiError_1 = require("../../utils/apiError");
const apiResponse_1 = require("../../utils/apiResponse");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const signupController = async (req, res, next) => {
    try {
        const { email, provider, password, username, name, profilePic } = req.body;
        console.log({ reqBody: req.body });
        if (!provider) {
            throw new apiError_1.ApiError(400, "Provider is required for signup");
        }
        if (!Object.values(client_1.AuthProvider).includes(provider)) {
            throw new apiError_1.ApiError(400, "Invalid provider type. Must be GOOGLE, GITHUB, or CREDENTIALS");
        }
        // Check if user already exists
        const existingUser = await db_config_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            throw new apiError_1.ApiError(400, "User already exists with this email");
        }
        // Handle password logic for CREDENTIALS provider
        let hashedPassword = undefined;
        if (provider === client_1.AuthProvider.CREDENTIALS) {
            if (!password || password.trim() === "") {
                throw new apiError_1.ApiError(400, "Password is required for credentials signup");
            }
            console.log(`Hashing password for user: ${email}`);
            hashedPassword = await bcrypt_1.default.hash(password, 10);
        }
        // Create the user
        const createdUser = await db_config_1.prisma.user.create({
            data: {
                email,
                name: name || "",
                provider: provider,
                username: username || "",
                password: hashedPassword, // will be undefined for social providers
                avatarUrl: profilePic || ""
            }
        });
        // console.log("Created User From DB:", createdUser);
        // Generate JWT token
        const jwtToken = await (0, jwt_service_1.createJwtToken)({ user: createdUser });
        if (!jwtToken) {
            throw new apiError_1.ApiError(500, "Failed to create JWT token");
        }
        const response = {
            id: createdUser.id,
            email: createdUser.email,
            username: createdUser.username,
            name: createdUser.name,
            token: jwtToken,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
            bio: createdUser.bio || "",
            avatarUrl: createdUser.avatarUrl || "",
        };
        console.log({ response });
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        };
        return res.cookie('username', username, options).cookie('token', jwtToken, options).status(201).send(new apiResponse_1.ApiResponse(200, "User signed up successfully", response));
    }
    catch (error) {
        console.log({ error });
        next(error);
    }
};
exports.signupController = signupController;
//# sourceMappingURL=signup.controller.js.map