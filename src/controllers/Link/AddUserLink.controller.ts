import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";

import { Link } from "@prisma/client";
import { LinkItem } from "../../types/misc.types";
import { addLinksToUser } from "../../services/Links/addLinksToUser.service";




const addUserLinkController = async (req: Request, res: Response) => {
   try {
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
      if (!userId) {
         throw new ApiError(400, "User ID is required");
      }

      const { links } = req.body as { links: LinkItem[] };

      if (!links || links.length == 0) {
         throw new ApiError(400, "Links are required");
      }

      const addedLinksToUser = await addLinksToUser(userId, links);

      if (!addedLinksToUser) {
         throw new ApiError(404, "Somthing Went Wrong", "Links not added to user");
      }


      return res.status(200).json(new ApiResponse(200, "Links added successfully", addedLinksToUser));
   } catch (error: unknown) {
      console.log("Error While Adding Link To user");
      console.log({ error });
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).send(new ApiError(500, "Internal Server Error", errorMessage));
   }
}





export { addUserLinkController }