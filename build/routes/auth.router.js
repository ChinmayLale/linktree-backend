"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// Creeate Auth Router Here 
const express_1 = require("express");
const signup_controller_1 = require("../controllers/auth/signup.controller");
const userNameCheck_controller_1 = require("../controllers/auth/userNameCheck.controller");
const login_controller_1 = require("../controllers/auth/login.controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// Define the signup route
authRouter.post('/signup', signup_controller_1.signupController);
authRouter.get('/check-username', userNameCheck_controller_1.userNameCheckController);
authRouter.post('/login', login_controller_1.loginController);
// This router handles authentication-related routes, such as user signup.
//# sourceMappingURL=auth.router.js.map