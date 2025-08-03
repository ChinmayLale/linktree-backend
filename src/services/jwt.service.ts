import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const createJwtToken =async ({ user }: { user: Partial<User> }): Promise<string> => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    const tokenSecret = process.env['JWT_SECRET'] || "acgatfg9uqtfbyquyq9b8fgqn879y"; // fallback

    if (!tokenSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(payload, tokenSecret, {
        expiresIn: "7d", // optional: you can customize token validity
    });

    return token;
};

export { createJwtToken };
