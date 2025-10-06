import { LinkAnalyticsService } from "../../services/Links/LinkAnalytics.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";



const AddClickToLinkController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { linkId } = req.query;
      if (!linkId) {
         throw new ApiError(400, "Link ID is required");
      }
      const UpdateClickes = await LinkAnalyticsService.updateLinkClicks(linkId as string);
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


const AddViewsToLinksController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { username } = req.body;
      if (!username) {
         throw new ApiError(400, "Username is required");
      }
      const updateViews = await LinkAnalyticsService.updateViewsOnLinksService(username);
      if (!updateViews) {
         return res.status(404).send(new ApiError(404, "Somthing Went Wrong While Adding View To Link", "View not added to link"))
      }
      return res.status(200).json(new ApiResponse(200, "View Added Successfully", updateViews));
   } catch (error) {
      console.log("SomeThing Went Wrong While Adding View To Link in Controller");
      console.log({ error });
      next(error);
   }
}



export const LinkAnalyticsController = {
   AddClickToLinkController,
   AddViewsToLinksController
}