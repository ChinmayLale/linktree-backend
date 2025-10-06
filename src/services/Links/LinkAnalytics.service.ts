import { prisma } from "../../db/db.config";




const updateLinkClicks = async (linkId: string): Promise<boolean> => {
   try {

      if (!linkId) {
         console.log("userId || LinkId is missing");
         return false;
      }

      const isUpdated = await prisma.link.update({
         where: {
            id: linkId,
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



const updateViewsOnLinksService = async (userId: string): Promise<boolean> => {
   try {
      const user = await prisma.user.findFirst({
         where: {
            username: userId
         }
      })

      if (!user) {
         console.log("User not found");
         return false;
      }

      const updatedViews = await prisma.user.update({
         where: {
            id: user.id
         },
         data: {
            views: {
               increment: 1
            }
         }
      })

      return true;
   } catch (error) {
      console.log("Somthing went Wrong While Adding Views To Link In Link Service");
      console.log({ error });
      return false;
   }
}

const getViewsVsClickGraph = (userId: string) =>{
   try {
      
   } catch (error) {
      console.log("Somthing Went Wrong While Getting Clicks Vs Views Graph");
   }
}


export const LinkAnalyticsService = {
   updateLinkClicks,
   updateViewsOnLinksService,
   getViewsVsClickGraph
}