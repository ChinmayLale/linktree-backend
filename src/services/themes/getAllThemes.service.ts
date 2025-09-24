import { ThemeSettings } from "@prisma/client";
import { prisma } from "../../db/db.config";



export const getAllThemesService = async (): Promise<ThemeSettings[]> => {
   try {
      const themes = await prisma.themeSettings.findMany();
      return themes;
   } catch (error) {
      console.error("Error fetching themes:");
      console.log({ error });
      return []
   }
}