"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const getUserProfile_controller_1 = require("../controllers/user/getUserProfile.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/:username', getUserProfile_controller_1.getUserProfileController);
//# sourceMappingURL=user.router.js.map