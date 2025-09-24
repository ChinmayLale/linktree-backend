import { Link } from "@prisma/client";
import { LinkItem } from "../../types/misc.types";
import { prisma } from "../../db/db.config";




export const addLinksToUser = async (userId: string, links: LinkItem[]): Promise<number | null> => {
   try {

      const addedLinks = await prisma.link.createMany({
         data: links.map((link) => ({
            userId: userId,
            type: link.type,
            title: link.title,
            url: link.url,
            icon: link.icon || null,
            color: link.color,
            active: link.active,
            style: link.style,
            thumbnail: link.thumbnail || null,
            clicks: link.clicks || 0,
            duration: link.duration || null,
            images: link.images || [],
            // Handle metadata properly - convert undefined to null for Prisma
            metadata: (link.metadata || null) as any,
            // Map status properly to your enum, or remove if not needed
            status: 'DRAFT' as const,
         })),
         skipDuplicates: true
      });
      return addedLinks.count;
   } catch (error) {
      console.error("Error adding links to user:", error);
      throw new Error("Could not add links to user");
   }
}