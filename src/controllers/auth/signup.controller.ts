import { Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { User, AuthProvider } from "@prisma/client"
import { UserLoginSignup } from "../../types/user.types";
import { prisma } from "../../db/db.config";
import { createJwtToken } from "../../services/jwt.service";

const signupController = async (req: Request, res: Response) => {
    try {
        const { email, provider, password, username, name, profilePic } = req.body; // Assuming user data is sent in the request body

        const user = {
            email: email,
            provider: provider as AuthProvider,
            name: name || "",
            username: username || "",
            password: password, // Password is optional for social signups
            avatarUrl: profilePic || ""
        } as User;
        if (!user.provider) {
            throw new ApiError(400, "Provider is required for signup");
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (existingUser) {
            throw new ApiError(400, "User already exists with this email");
        }

        // Create a new user
        let createdUser = {} as User;
        if (user.provider === AuthProvider.GOOGLE) {
            createdUser = await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    provider: user.provider,
                    username: user.username,
                }
            })
        }

        //Create Jwt Token 
        const jwtToken = createJwtToken({ user: createdUser });

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

        return res.status(201).send(new ApiResponse(200, "User signed up successfully", response));
    } catch (error: Error | any) {
        throw new ApiError(500, "Internal Server Error", error);
    }
}



export { signupController };