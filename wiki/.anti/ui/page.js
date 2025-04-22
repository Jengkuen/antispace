"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pageUI;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
//@ts-nocheck
const sdk_1 = require("@antispace/sdk");
/**
 * Main page UI component for the Wiki app
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
async function pageUI(anti) {
    const { action, values, meta } = anti;
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { padding: "medium", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", children: "Wikipedia Integration" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "dim", children: "Search and browse Wikipedia content directly from Antispace." }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, {}), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "subheading", children: "Functions" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: "This Wikipedia integration provides access to the following functions:" }), (0, jsx_runtime_1.jsxs)(sdk_1.components.List, { children: [(0, jsx_runtime_1.jsx)(sdk_1.components.ListItem, { children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: "Search Wikipedia for articles" }) }), (0, jsx_runtime_1.jsx)(sdk_1.components.ListItem, { children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: "Get article summaries" }) }), (0, jsx_runtime_1.jsx)(sdk_1.components.ListItem, { children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: "View article sections" }) }), (0, jsx_runtime_1.jsx)(sdk_1.components.ListItem, { children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "text", children: "Track recent searches" }) })] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, {}), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "subheading", children: "Example Usage" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Code, { language: "typescript", children: `
// Search Wikipedia
const results = await ai.wiki_search({ query: "artificial intelligence" });

// Get article summary
const summary = await ai.wiki_get_article_summary({ title: "Neural network" });

// Get article sections
const sections = await ai.wiki_get_article_sections({ title: "Machine learning" });

// Get recent searches
const searches = await ai.wiki_get_recent_searches({ limit: 5 });
        ` })] }));
}
