import { prisma } from "../../db/db.config";




const updateLinkClicks = async (userId: string, linkId: string): Promise<boolean> => {
   try {

      if (!userId || !linkId) {
         console.log("userId || LinkId is missing");
         return false;
      }

      const isUpdated = await prisma.link.update({
         where: {
            id: linkId,
            userId: userId
         },
         data: {
            clicks: {
               increment: 1
            }
         }
      })

      if (!isUpdated) {
         return false;
      }

      return true;
   } catch (error) {
      console.log("Somthing Went Wrong While Adding Link Clicks ...");
      return false;
   }
}



export const LinkAnalyticsService = {
   updateLinkClicks
}