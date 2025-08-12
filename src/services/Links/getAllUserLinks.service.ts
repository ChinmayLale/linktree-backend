import { Link } from "@prisma/client";
import { prisma } from "../../db/db.config";



export const getAllUserLinks = async (userId: string): Promise<Link[]> => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const links = await prisma.link.findMany({
            where: {
                userId: userId,
            }
        })

        return links;
    } catch (error) {
        console.error("Error fetching user links:", error);
        throw new Error("Could not fetch user links");
    }
}


