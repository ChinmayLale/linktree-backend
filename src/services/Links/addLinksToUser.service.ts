import { Link } from "@prisma/client";
import { LinkItem } from "../../types/misc.types";
import { prisma } from "../../db/db.config";




export const addLinksToUser = async (userId: string, links: LinkItem[]): Promise<number | null> => {
   try {
      const addedLinks = await prisma.link.createMany({
         data: links.map((link) => ({
            ...link,
            userId: userId,
         })),
      });
      return addedLinks.count;
   } catch (error) {
      console.error("Error adding links to user:", error);
      throw new Error("Could not add links to user");
   }
}