import { CookieOptions, NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { User, AuthProvider } from "@prisma/client";
import { prisma } from "../../db/db.config";
import bcrypt from "bcrypt";
import { createJwtToken } from "../../services/jwt.service";

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, provider, password } = req.body; // Assuming user data is sent in the request body
        if (!email || !provider) {
            throw new ApiError(400, "Email and provider are required for login");
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            console.log("User not found for email:", email);
            throw new ApiError(404, "User not found");
        }
        if (!(user.provider === provider)) {
            console.log("User provider mismatch:", user.provider, provider);
            throw new ApiError(400, `User is registered with ${user.provider?.toLowerCase()} provider, cannot login with ${provider} provider`);
        }
        if (user.provider === AuthProvider.CREDENTIALS.toString() && provider === AuthProvider.CREDENTIALS.toString()) {
            // Handle password logic for CREDENTIALS provider

            if (!password || password.trim() === "") {
                throw new ApiError(400, "Password is required for credentials login");
            }

            // Verify Password
            const isPasswordValid = await bcrypt.compare(password, user.password || "");
            if (!isPasswordValid) {
                throw new ApiError(401, "Invalid credentials");
            }
        }


        // Create JWT Token
        const payload = {
            id: user.id,
            email: user.email,
            provider: user.provider
        } as Partial<User>;
        const token = await createJwtToken({ user: payload });

        if (!token) {
            throw new ApiError(500, "Failed to create JWT token");
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

        const options: CookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        }

        // Send response
        return res.cookie('username', user.username, options).cookie('token', token, options).status(200).send(new ApiResponse(200, "Login successful", userData));


    } catch (error) {
        console.log({ error });
        next(error)
    }
}



export { loginController };