import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { ApiError } from "../../utils/apiError";
import { ThemeSettings } from "../../types/theme.types";
import { addThemesInDb } from "../../services/themes/AddThemesInDb.service";

export const addThemesController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user.id;
      const { theme }: { theme: ThemeSettings[] } = req.body;

      if (!userId) {
         return res.status(400).json(new ApiError(400, "User ID is required", "User Id is required"));
      }

      if (!theme || theme.length == 0) {
         return res.status(400).json(new ApiError(400, "Theme is required", "Theme is required"));
      }

      const updateThemes = await addThemesInDb(theme);

      if (!updateThemes) {
         return res.status(404).json(new ApiError(404, "Somthing Went Wrong", "Updating Themes Faild"));
      }
      return res.status(200).json(new ApiResponse(200, "Theme added successfully", updateThemes));
   } catch (error) {
      console.log("Sonthing Went Wrong while adding theme");
      console.log({ error });
      next(error);
   }
}