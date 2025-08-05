"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNameCheckController = void 0;
const apiError_1 = require("../../utils/apiError");
const apiResponse_1 = require("../../utils/apiResponse");
const db_config_1 = require("../../db/db.config");
const userNameCheckController = async (req, res, next) => {
    try {
        const { username } = req.query; // Assuming username is sent in the request body
        if (!username) {
            throw new apiError_1.ApiError(400, "Username is required");
        }
        // Check if the username already exists in the database
        const existingUser = await db_config_1.prisma.user.findUnique({
            where: {
                username: username.toString().toLowerCase()
            }
        });
        if (existingUser) {
            return res.status(200).json(new apiResponse_1.ApiResponse(400, "Username is already taken", { availble: false }));
        }
        return res.status(200).json(new apiResponse_1.ApiResponse(200, "Username is available", { availble: true }));
    }
    catch (error) {
        console.log({ error });
        next(error);
    }
};
exports.userNameCheckController = userNameCheckController;
//# sourceMappingURL=userNameCheck.controller.js.map