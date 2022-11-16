"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insecureDecrypt = exports.atob = void 0;
const atob = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
};
exports.atob = atob;
const insecureDecrypt = (encoded, salt) => {
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join('');
};
exports.insecureDecrypt = insecureDecrypt;
