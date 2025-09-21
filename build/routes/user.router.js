"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const getUserProfileInfo_controller_1 = require("../controllers/user/getUserProfileInfo.controller");
const getUserProfile_controller_1 = require("../controllers/user/getUserProfile.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const updateUserProfile_controller_1 = require("../controllers/user/updateUserProfile.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/', getUserProfileInfo_controller_1.getUserInfo);
userRouter.get('/profile', auth_middleware_1.authenticate, getUserProfile_controller_1.getUserProfile); // Assuming this is for getting the profile of the authenticated user
userRouter.post('/profile', auth_middleware_1.authenticate, updateUserProfile_controller_1.updateUserProfileController);
//# sourceMappingURL=user.router.js.map