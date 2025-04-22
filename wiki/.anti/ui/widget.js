"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = widgetUI;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
//@ts-nocheck
const sdk_1 = require("@antispace/sdk");
const local_1 = __importDefault(require("../db/local"));
/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
async function widgetUI(anti) {
    const { action, values, meta } = anti;
    // Get recent searches for this user
    const userSearchKey = `${meta?.user?.id}:wiki_searches`;
    let recentSearches = await local_1.default.get(userSearchKey) || [];
    switch (action) {
        case "set_api_key": {
            if (values.api_key) {
                await local_1.default.set(`${meta?.user?.id}:wiki_api_key`, values.api_key);
            }
            break;
        }
        case "clear_search_history": {
            await local_1.default.set(userSearchKey, []);
            recentSearches = [];
            break;
        }
        default: {
            break;
        }
    }
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { padding: "medium", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", children: "Wikipedia" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "dim", children: "Search and retrieve information from Wikipedia" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, {}), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "subheading", children: "Recent Searches" }), recentSearches.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [recentSearches.slice(0, 5).map((search, index) => ((0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { type: "text", justify: "space-between", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: search.query }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "dim", children: new Date(search.timestamp).toLocaleString() })] }, index))), (0, jsx_runtime_1.jsx)(sdk_1.components.Button, { action: "clear_search_history", text: "Clear History", variant: "secondary" })] })) : ((0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "dim", children: "No recent searches" })), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, {}), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "subheading", children: "API Settings" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "dim", children: "WikiMedia API doesn't require a key for most operations, but you can set one if needed for specialized access." }), (0, jsx_runtime_1.jsx)(sdk_1.components.Input, { placeholder: "API Key (optional)", name: "api_key" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Button, { action: "set_api_key", text: "Save API Key", variant: "secondary" })] }));
}
