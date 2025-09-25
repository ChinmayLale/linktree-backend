import { Request, Response, NextFunction, CookieOptions } from "express";
import { prisma } from "../../db/db.config";
import { createJwtToken } from "../../services/jwt.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { UserLoginSignup } from "../../types/user.types";
import bcrypt from "bcrypt";
import { AuthProvider } from "@prisma/client";
import { updateUsersThemeService } from "../../services/themes/UpdateUsersTheme.service";

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, provider, password, username, name, profilePic } = req.body;
        console.log({ reqBody: req.body });

        if (!provider) {
            throw new ApiError(400, "Provider is required for signup");
        }


        if (!Object.values(AuthProvider).includes(provider)) {
            throw new ApiError(400, "Invalid provider type. Must be GOOGLE, GITHUB, or CREDENTIALS");
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ApiError(400, "User already exists with this email");
        }

        // Handle password logic for CREDENTIALS provider
        let hashedPassword: string | undefined = undefined;
        if (provider === AuthProvider.CREDENTIALS) {
            if (!password || password.trim() === "") {
                throw new ApiError(400, "Password is required for credentials signup");
            }
            console.log(`Hashing password for user: ${email}`);
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const CLEAN_THEME_ID = "493e7d89-cf07-4241-8fc0-8b2e7cc215f8";
        // Create the user
        const createdUser = await prisma.user.create({
            data: {
                email,
                name: name || "",
                provider: provider as AuthProvider,
                username: username || "",
                password: hashedPassword, // will be undefined for social providers
                avatarUrl: profilePic || "",
                themeId: CLEAN_THEME_ID
            }
        });

        // console.log("Created User From DB:", createdUser);

        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }



        // Generate JWT token
        const jwtToken = await createJwtToken({ user: createdUser });
        if (!jwtToken) {
            throw new ApiError(500, "Failed to create JWT token");
        }

        const response: UserLoginSignup = {
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
        const options: CookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        }

        return res.cookie('username', username, options).cookie('token', jwtToken, options).status(201).send(new ApiResponse(200, "User signed up successfully", response));
    } catch (error: any) {
        console.log({ error });
        next(error);
    }
};

export { signupController };
