import { publishAllLinksService } from "../../services/Links/PublishAllLink.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";



const PublishLinkController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user.id;

      if (!userId) {
         throw new ApiError(400, "User ID is required");
      }

      const isPublished = publishAllLinksService(userId);

      if (!isPublished) {
         return res.status(500).send(new ApiError(500, "Somthing Went Wrong While Updating link Status"))
      }

      return res.status(200).send(new ApiResponse(200, "Link Status Updated Successfully ", isPublished))
   } catch (error) {
      console.log("Error while Get User Links ");
      console.log({ error });
      next(error);
   }
}




export { PublishLinkController }