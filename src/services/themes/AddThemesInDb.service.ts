import { templates, templateStyles } from "../../Constants/themes";
import { prisma } from "../../db/db.config";
import { ThemeSettings } from "../../types/theme.types";



export const addThemesInDb = async (): Promise<boolean> => {
   try {


      const mergedTemplates = templates.map((template) => {
         const style = templateStyles[template.id];
         return {
            ...style,
            name: template.name, // Override style name with template name
            preview: template.preview,
         };
      });

      console.log(mergedTemplates);


      const mappedThemes = mergedTemplates.map(theme => ({
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