"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = void 0;
const apiError_1 = require("../../utils/apiError");
const apiResponse_1 = require("../../utils/apiResponse");
const db_config_1 = require("../../db/db.config");
const getUserProfileController = async (req, res, next) => {
    try {
        const { username } = req.params;
        console.log(`GetUser Profile Controller called for username: ${username}`);
        if (!username) {
            throw new apiError_1.ApiError(400, "Username is required to get user profile");
        }
        const UserProfile = await db_config_1.prisma.user.findUnique({
            where: { username: username }
        });
        if (!UserProfile) {
            throw new apiError_1.ApiError(404, "User profile not found");
        }
        return res.status(200).send(new apiResponse_1.ApiResponse(200, "User profile fetched successfully", UserProfile));
    }
    catch (error) {
        console.log("Error while Getting User Profile");
        console.log({ error });
        next(error);
    }
};
exports.getUserProfileController = getUserProfileController;
//# sourceMappingURL=getUserProfile.controller.js.map