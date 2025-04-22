"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = widgetUI;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const sdk_1 = require("@antispace/sdk");
/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
async function widgetUI(anti) {
    const { action, values, meta } = anti;
    console.log({ action, values, meta });
    return ((0, jsx_runtime_1.jsx)(sdk_1.components.Column, { children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", children: "Hello, Antispace!" }) }));
}
