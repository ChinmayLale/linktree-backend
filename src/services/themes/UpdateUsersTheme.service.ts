import { prisma } from "../../db/db.config"



const updateUsersThemeService = async (userId: string, themeId: string): Promise<boolean> => {
   try {

      if (!userId || !themeId) {
         throw new Error("User Id or Theme Id is missing");
      }

      const theme = prisma.themeSettings.findFirst({
         where: {
            id: themeId
         }
      })

      if (!theme) {
         throw new Error("Theme not found");
      }

      const updatedTheme = await prisma.user.update({
         where: { id: userId },
         data: {
            themeId: themeId,
         },
      });

      if (updatedTheme.themeId !== themeId) {
         return false;
      }
      return true;
   } catch (error) {
      console.log("Somthing Went Wrong while adding theme to user profile");
      console.log({ error });
      return false;
   }
}



export { updateUsersThemeService }