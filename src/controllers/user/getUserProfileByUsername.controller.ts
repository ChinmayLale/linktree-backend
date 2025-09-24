import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { getUserProfileWithUserNameService } from "../../services/User/Profile.service";



export const getUserProfileByUsernameController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { userName } = req.params;
      if (userName?.trim() === "") {
         throw new ApiError(400, "Username is required");
      }
      const userProfile = await getUserProfileWithUserNameService(userName as string);
      if (!userProfile) {
         throw new ApiError(404, "User profile not found");
      }
      return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", userProfile));
   } catch (error) {
      console.log("Error while getting user profile:", error);
      next(error);
   }
}