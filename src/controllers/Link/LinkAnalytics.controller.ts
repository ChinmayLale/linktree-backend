import { LinkAnalyticsService } from "../../services/Links/LinkAnalytics.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";



const AddClickToLinkController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { linkId } = req.query;
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
      if (!userId) {
         throw new ApiError(400, "User ID is required");
      }

      if (!linkId) {
         throw new ApiError(400, "Link ID is required");
      }


      const UpdateClickes = await LinkAnalyticsService.updateLinkClicks(userId, linkId as string);

      if (!UpdateClickes) {
         return res.status(404).json(new ApiError(404, "Somthing Went Wrong While Adding Click To Link", "Click not added to link"))
      }
      return res.status(200).json(new ApiResponse(200, "Click Added Successfully", UpdateClickes));
   } catch (error) {
      console.log("SomeThing Went Wring While Adding Click To Link");
      console.log({ error });
      next(error);
   }
}



export const LinkAnalyticsController = {
   AddClickToLinkController
}