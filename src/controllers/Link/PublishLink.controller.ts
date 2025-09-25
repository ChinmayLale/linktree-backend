import { publishAllLinksService } from "../../services/Links/PublishAllLink.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";



const PublishLinkController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      console.log("Publish Link Controller Called");
      const userId = req.user.id;
      console.log("UserID : ", userId);
      if (!userId) {
         throw new ApiError(400, "User ID is required");
      }

      const isPublished = publishAllLinksService(userId);
      console.log("Publish Link Service Called Result : ", isPublished);

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