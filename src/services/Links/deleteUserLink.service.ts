import { prisma } from "../../db/db.config";



export const deleteUserLinkService = async (linkId: string, userId: string): Promise<boolean> => {
   try {
      if (!linkId || !userId) {
         throw new Error("Link Id or User Id is missing");
      }
      const link = await prisma.link.findUnique({ where: { id: linkId } });
      if (!link) {
         throw new Error("Link not found");
      }
      if (link.userId !== userId) {
         throw new Error("You are not authorized to delete this link");
      }

      const isDeleted = await prisma.link.delete({ where: { id: linkId, userId: userId } });
      return isDeleted ? true : false;
   } catch (error) {
      console.log("Somthing Went Wrong While Adding User Links ...");
      console.log({ error });
      return false;
   }
}