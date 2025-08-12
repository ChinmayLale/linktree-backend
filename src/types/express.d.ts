import "express";
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                username: string;
                exp?: number; // Optional expiration timestamp
                iat?: number; // Optional issued at timestamp
            }
        }
    }
}
