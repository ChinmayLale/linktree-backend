import { prisma } from "../../db/db.config";



export const publishAllLinksService = async (id: string): Promise<boolean> => {
   try {

      const updateLinkStatus = await prisma.link.updateMany({
         where: {
            userId: id
         },
         data: {
            status: "PUBLISHED"
         }
      })

      if (updateLinkStatus.count == 0) {
         return false;
      }

      return true;
   } catch (error) {
      console.log("Somthing Went Wrong While Adding User Links ...");
      return false;
   }
}