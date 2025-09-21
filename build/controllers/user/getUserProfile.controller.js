"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const apiResponse_1 = require("../../utils/apiResponse");
const apiError_1 = require("../../utils/apiError");
const Profile_service_1 = require("../../services/User/Profile.service");
const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        if (!userId) {
            throw new apiError_1.ApiError(400, "User ID is required");
        }
        const userProfile = await (0, Profile_service_1.getUserProfileService)(userId);
        if (!userProfile) {
            throw new apiError_1.ApiError(404, "User profile not found");
        }
        const { password, ...safeUserProfile } = userProfile;
        return res.status(200).json(new apiResponse_1.ApiResponse(200, "User profile fetched successfully", safeUserProfile));
    }
    catch (error) {
        console.log("Error while getting user profile:", error);
        next(error);
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=getUserProfile.controller.js.map