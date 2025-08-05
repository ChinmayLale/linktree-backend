"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./db/db.config");
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '../.env'
});
(0, db_config_1.ConnectToDB)().then(() => {
    const PORT = process.env['PORT'] || 8000;
    app_1.app.listen(PORT, () => {
        console.log("✅ App is Listening on Port " + PORT);
    });
}).catch((e) => {
    console.error(e);
});
//# sourceMappingURL=index.js.map