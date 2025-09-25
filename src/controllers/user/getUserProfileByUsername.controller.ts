import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { getUserProfileWithUserNameService } from "../../services/User/Profile.service";
import { LinkItem } from "../../types/misc.types";
import { getAllUserLinks } from "../../services/Links/getAllUserLinks.service";



export const getUserProfileByUsernameController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { userName } = req.params;
      if (userName?.trim() === "") {
         throw new ApiError(400, "Username is required");
      }
      const userProfile = await getUserProfileWithUserNameService(userName as string);
      const userLinks: LinkItem[] = await getAllUserLinks(userProfile?.id as string);
      if (!userProfile) {
         throw new ApiError(404, "User profile not found");
      }
      if (!userLinks) {
         return res.status(404).json(new ApiResponse(404, "No links found for this user", []));
      }
      return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", { userProfile, userLinks }));
   } catch (error) {
      console.log("Error while getting user profile:", error);
      next(error);
   }
}