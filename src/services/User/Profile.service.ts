
import { User } from "@prisma/client";
import { prisma } from "../../db/db.config";
import { Optional } from "@prisma/client/runtime/client";
import { SafeUser } from "../../types/misc.types";


interface UpdateUserProfileInput {
   name?: string;
   bio?: string;
   tags?: string[];
   avatarUrl?: string;
   isProfilePublic?: boolean;
}



export const getUserProfileService = async (userId: string): Promise<User | null> => {
   try {
      const userProfile = await prisma.user.findUnique({
         where: { id: userId },
      });
      if (!userProfile) {
         throw new Error("User profile not found");
      }
      return userProfile;
   } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
   }
}


export const updateUserProfileService = async (userId: string, data: UpdateUserProfileInput): Promise<SafeUser | null> => {
   try {
      // Check if user exists
      const user = await prisma.user.findUnique({
         where: { id: userId }
      });
      // console.log({ user });
      if (!user) {
         throw new Error("User not found");
      }

      // Update user profile
      const updatedUser = await prisma.user.update({
         where: { id: userId },
         data: {
            name: data.name ?? user.name,
            bio: data.bio ?? user.bio,
            tags: data.tags ?? user.tags,
            avatarUrl: data.avatarUrl ?? user.avatarUrl,
            isProfilePublic: data.isProfilePublic ?? user.isProfilePublic
         },
      });

      const { password, ...safeUser } = updatedUser;
      return safeUser;
   } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
   }
};