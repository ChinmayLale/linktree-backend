import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { prisma } from "../../db/db.config";



const userNameCheckController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username } = req.query; // Assuming username is sent in the request body

        if (!username) {
            throw new ApiError(400, "Username is required");
        }

        // Check if the username already exists in the database
        // console.log("Checking For UserName : " + username.toString());
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username.toString()
            }
        });

        if (existingUser) {
            return res.status(200).json(new ApiResponse(200, "Username is already taken", { availble: false }));
        }

        return res.status(200).json(new ApiResponse(200, "Username is available", { availble: true }));
    } catch (error) {
        console.log({ error })
        next(error);
    }
}



export { userNameCheckController };