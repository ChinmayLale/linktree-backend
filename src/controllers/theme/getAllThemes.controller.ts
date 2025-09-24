import { ThemeSettings } from "@prisma/client";
import { getAllThemesService } from "../../services/themes/getAllThemes.service";

import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";

import { Request, Response, NextFunction } from "express";



const getAllThemesController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.user.id;

      if (!userId) {
         return res.status(400).json(new ApiError(400, "User ID is required", "User Id is required"));
      }

      const themes: ThemeSettings[] = await getAllThemesService();
      if (!themes) {
         return res.status(404).json(new ApiError(404, "Somthing Went Wrong", "Getting Themes Faild"));
      }
      return res.status(200).json(new ApiResponse(200, "Themes fetched successfully", themes));
   } catch (error) {
      console.log("Somthing Went Wrong while getting all themes");
      console.log({ error });
      next(error);
   }
}



export { getAllThemesController }