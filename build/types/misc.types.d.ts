import { User } from "@prisma/client";
export type tokenPayload = {
    id: string;
    email: string;
    username: string;
    fullName: string;
    phone_number: string;
    exp?: number;
    iat?: number;
};
export type SafeUser = Omit<User, "password">;
export interface UpdateUserProfileInput {
    name?: string;
    bio?: string;
    tags?: string[];
    avatarUrl?: string;
    isProfilePublic?: boolean;
}
