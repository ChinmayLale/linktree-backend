import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { UpdateUserProfileInput } from "../../types/misc.types";
import { updateUserProfileService } from "../../services/User/Profile.service";




export const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
      if (!userId) {
         return res.status(400).json(new ApiError(400, "User ID is required", "User Id is required"));
      }

      const data: UpdateUserProfileInput = req.body;

      if (!data) {
         return res.status(400).json(new ApiError(400, "Data is required", "Data is required"));
      }

      const updatedUserProfile = await updateUserProfileService(userId, data);

      if (!updatedUserProfile) {
         return res.status(404).json(new ApiError(404, "Somthing Went Wrong", "User profile not found"));
      }
      return res.status(200).json(new ApiResponse(200, "User profile updated successfully", updatedUserProfile));
   } catch (error) {
      console.log("Error while Updating User Profile");
      console.log({ error });
      next(error);
   }
}