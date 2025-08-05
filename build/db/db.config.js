"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = require("../utils/apiError");
const dotenv_1 = __importDefault(require("dotenv"));
const extension_accelerate_1 = require("@prisma/extension-accelerate");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient({
    // log: ['info','query','warn','error'],
    log: [{ emit: 'event', level: 'query' }],
    errorFormat: 'pretty'
}).$extends((0, extension_accelerate_1.withAccelerate)());
exports.prisma = prisma;
const ConnectToDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully!');
    }
    catch (error) {
        console.error('❌ Database connection failed ', error);
        throw new apiError_1.ApiError(400, "Cannot connect to DB", error.message);
    }
};
exports.ConnectToDB = ConnectToDB;
//# sourceMappingURL=db.config.js.map