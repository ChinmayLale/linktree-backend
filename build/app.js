"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apiError_1 = require("./utils/apiError");
const auth_router_1 = require("./routes/auth.router");
const user_router_1 = require("./routes/user.router");
const app = (0, express_1.default)();
exports.app = app;
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); 
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: process.env['CORS_ORIGIN'] || "*",
    credentials: true
}));
app.use(express_1.default.json({ limit: '20kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.get('/ping', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pong | Server is running",
        error: [],
        data: null
    });
});
// Auth Router
app.use("/api/v1/auth", auth_router_1.authRouter);
// User Router
app.use("/api/v1/user", user_router_1.userRouter);
app.use(apiError_1.globalErrorHandler);
//# sourceMappingURL=app.js.map