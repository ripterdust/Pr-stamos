"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.serverConfig = {
    PORT: process.env.PORT || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
};
