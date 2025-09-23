import { Link } from "@prisma/client";
import { prisma } from "../../db/db.config";
import { mapLinkToLinkItem } from "../../utils/mapLinkToLinkItem";
import { LinkItem } from "../../types/misc.types";



export const getAllUserLinks = async (userId: string): Promise<LinkItem[]> => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const links = await prisma.link.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const formattedLinks = links.map(mapLinkToLinkItem);

        return formattedLinks;
    } catch (error) {
        console.error("Error fetching user links:", error);
        throw new Error("Could not fetch user links");
    }
}


