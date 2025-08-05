import { User } from "@prisma/client";
declare const createJwtToken: ({ user }: {
    user: Partial<User>;
}) => Promise<string>;
export { createJwtToken };
