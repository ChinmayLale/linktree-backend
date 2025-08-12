import { ApiResponse } from "../../utils/apiResponse";
import { ApiError } from "../../utils/apiError";
import { Request, Response, NextFunction } from "express";
import { getAllUserLinks } from "../../services/Links/getAllUserLinks.service";
import { Link } from "@prisma/client";


export const getAllUserLinksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const links: Link[] = await getAllUserLinks(userId);
        if (!links || links.length === 0) {
            return res.status(404).json(new ApiResponse(404, "No links found for this user", []));
        }

        return res.status(200).json(new ApiResponse(200, "User links fetched successfully", links));
        
    } catch (error) {
        next(error);
    }
}