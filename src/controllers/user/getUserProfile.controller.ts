import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { prisma } from "../../db/db.config";




const getUserProfileController = async (req: any, res: any, next: any) => {
    try {
        const { username } = req.params;
        console.log(`GetUser Profile Controller called for username: ${username}`);

        if (!username) {
            throw new ApiError(400, "Username is required to get user profile");
        }

        const UserProfile = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!UserProfile) {
            throw new ApiError(404, "User profile not found");
        }

        return res.status(200).send(new ApiResponse(200, "User profile fetched successfully", UserProfile));
    } catch (error) {
        console.log("Error while Getting User Profile");
        console.log({ error });
        next(error);
    }
}



export { getUserProfileController };