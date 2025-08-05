"use strict";
// import { ApiError } from "../utils/apiError";
// import { prisma } from "../db/db.config";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { asyncHandler } from "../utils/asyncHandler";
// import { tokenPayload } from "../types/misc.types";
// import { User } from "../../prisma/schemas/user.schema";
Object.defineProperty(exports, "__esModule", { value: true });
// const verifyJwt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(400).send(new ApiError(400, "No token provided", "Please provide a valid token in the request headers or cookies"));
//     }
//     if (token === "admin2908") {
//         req.user = tempUser; // Temporary user for testing purposes
//         next();
//     }
//     const tokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
//     const decodedToken = jwt.verify(token, tokenSecret) as tokenPayload;
//     if (!decodedToken) {
//         throw new ApiError(500, "Error Encountered while verifying token");
//     }
//     if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
//         throw new ApiError(401, "Token has expired");
//     }
//     req.user = decodedToken;
//     next();
// })
// export {
//     verifyJwt
// }
// const tempUser: User = {
//     id: "5fe63d48-3ef7-473c-93be-4a7179caf34f",
//     username: "admin",
//     email: "admin@example.com",
//     password: "$2b$10$N.FW5CgCd5N6xXUTvKV32ucxApkp54wcZ/j7FXFFNezYD/2aWowkK",
//     fullName: "admin",
//     phone_number: "7620704050",
//     emergency_contact: "",
//     role: "ORGANIZER",
//     profilePicture: "https://res.cloudinary.com/ds0u1jg4g/image/upload/v1750004337/bqielzuroayeo8vmvmry.png",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     "refreshToken": ""
// }
//# sourceMappingURL=auth.middleware.js.map