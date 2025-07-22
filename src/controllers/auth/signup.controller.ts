import { Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { User } from "../../../prisma/generated/prisma"
import { UserLoginSignup } from "../../types/user.types";

const signupController = async (req: Request, res: Response) => {
    try {
        const user: User = req.body; // Assuming user data is sent in the request body

        // Here you would typically hash the password and save the user to the database
        // For now, let's assume the user is saved successfully and return the user data

        const response: UserLoginSignup = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name || "New User",
            bio: user.bio || "account created",
            avatarUrl: user.avatarUrl || "https://example.com/default-avatar.png",
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };



        return res.status(201).send(new ApiResponse(200, "User signed up successfully", response));
    } catch (error: Error | any) {
        throw new ApiError(500, "Internal Server Error", error);
    }
}
