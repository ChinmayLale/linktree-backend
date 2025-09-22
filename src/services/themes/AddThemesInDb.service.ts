import { prisma } from "../../db/db.config";
import { ThemeSettings } from "../../types/theme.types";



export const addThemesInDb = async (Themes: ThemeSettings[]): Promise<boolean> => {
   try {

      if (!Themes || Themes.length == 0) {
         return false;
      }

      const mappedThemes = Themes.map(theme => ({
         ...theme,
         layout: theme.layout
            ? theme.layout.toLowerCase() as "stack" | "grid" | "masonry"
            : undefined,
         backdropBlur: theme.backdropBlur, // Prisma uses 'backDropBlur'
      }));

      const updatedThemes = await prisma.themeSettings.createMany({
         data: mappedThemes,
         skipDuplicates: true
      });

      if (updatedThemes.count > 0) {
         return true
      }
      return false
   } catch (error) {
      console.log("Somthing went Wrong while adding themes in DB ");
      console.log({ error });
      return false;
   }
}  