"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
async function handler(c) {
    return c.text(`Hello, ${process.env.NAME}`);
}
