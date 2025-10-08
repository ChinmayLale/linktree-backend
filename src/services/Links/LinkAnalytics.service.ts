import { title } from "process";
import { prisma } from "../../db/db.config";
import { ChartData } from "../../types/misc.types";
import { getAllUserLinks } from "./getAllUserLinks.service";




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

const getViewsVsClickGraph = async (userId: string): Promise<ChartData[]> => {
   try {
      if (!userId) {
         throw new Error("User Id is missing");
      }
      const totalViews = await prisma.user.findFirst({
         where: {
            id: userId
         },
         select: {
            views: true,
         }
      })
      const getLinks = await getAllUserLinks(userId);

      const chartData = getLinks.map(link => ({
         title: link.title,         // your "month" field will be link title
         views: totalViews?.views || 0,       // total views
         clicks: link.clicks || 0,  // clicks per link
      }));

      return chartData;

   } catch (error) {
      console.log("Somthing Went Wrong While Getting Clicks Vs Views Graph");
      return [];
   }
}


export const LinkAnalyticsService = {
   updateLinkClicks,
   updateViewsOnLinksService,
   getViewsVsClickGraph
}