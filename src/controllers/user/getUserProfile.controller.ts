import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { ApiError } from "../../utils/apiError";
import { prisma } from "../../db/db.config";


const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const userProfile = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                Link: true, // Include links associated with the user
            }
        });

        if (!userProfile) {
            throw new ApiError(404, "User profile not found");
        }
        const { password, ...safeUserProfile } = userProfile;
        return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", safeUserProfile));
    } catch (error) {
        console.log("Error while getting user profile:", error);
        next(error);
    }
}


export { getUserProfile };