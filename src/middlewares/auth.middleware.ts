// middleware/authenticate.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

interface JwtPayload {
    id: string;
    username: string;
    email?: string;
    exp?: number;
    iat?: number;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    let tokenSource: "header" | "cookie" | undefined;

    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        tokenSource = "header";
    } else if (req.cookies['token']) {
        token = req.cookies['token'];
        tokenSource = "cookie";
    }

    console.log({ tokenSource });
    if (!token) {
        return res.status(401).send(new ApiError(401, "Authentication token is required"));
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env['JWT_SECRET'] || "fallback_secret"
        ) as JwtPayload;

        if (!decoded) {
            return res.status(403).send(new ApiError(403, "Invalid token payload"));
        }
        req.user = decoded; // ✅ Now `req.user` is fully typed
        next();
    } catch {
        return res.status(403).send(new ApiError(403, "Invalid or expired token"));
    }
};
