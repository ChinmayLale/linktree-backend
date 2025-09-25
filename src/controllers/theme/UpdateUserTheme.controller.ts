import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { Request, Response, NextFunction } from "express";
import { updateUsersThemeService } from "../../services/themes/UpdateUsersTheme.service";



export const updateThemeController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { themeId } = req.body;
      const userId = req.user.id;
      if (!userId || !themeId) {
         throw new ApiError(400, "User Id or Theme Id is missing");
      }
      const result = await updateUsersThemeService(userId, themeId);
      if (result) {
         return res.status(200).json(new ApiResponse(200, "Theme updated successfully", result));
      }
      return res.status(404).json(new ApiError(404, "Somthing Went Wrong", "Updating Theme Faild"));
   } catch (error) {
      console.log("Somthing Went Wrong while adding theme to user profile");
      console.log({ error });
      next(error);
   }
}