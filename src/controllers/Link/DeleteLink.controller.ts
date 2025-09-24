import { deleteUserLinkService } from "../../services/Links/deleteUserLink.service";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";



export const deleteLinkController = async (req: any, res: any, next: any) => {
   try {
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
      if (!userId) {
         throw new ApiError(400, "User ID is required");
      }
      const { linkId } = req.query;
      if (!linkId) {
         throw new ApiError(400, "Link ID is required");
      }

      const isDeleted = await deleteUserLinkService(linkId as string, userId);

      if (!isDeleted) {
         return res.status(404).json(new ApiError(404, "Link not found"));
      }

      return res.status(200).json(new ApiResponse(200, "Link deleted successfully", isDeleted));
   } catch (error) {
      console.log("Somthing Went Wrong While Deleting Link");
      console.log({ error });
      next(error);
   }
};