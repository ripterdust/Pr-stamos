"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToJson = void 0;
const parseToJson = (element) => JSON.parse(JSON.stringify(element));
exports.parseToJson = parseToJson;
