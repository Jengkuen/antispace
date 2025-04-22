"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = aiActions;
//@ts-nocheck
const wiki_1 = require("./actions/wiki");
const local_1 = __importDefault(require("../db/local"));
// We delegate all parameter handling to the action functions for robustness
async function aiActions(...args) {
    const { name, parameters: rawParameters, meta } = args[0];
    // Log everything we receive for debugging
    console.log("AI Action called:", name);
    console.log("Raw parameters (typeof):", typeof rawParameters);
    console.log("Raw parameters:", JSON.stringify(rawParameters));
    console.log("Metadata:", meta);
    try {
        switch (name) {
            case "wiki_search": {
                console.log("Calling wiki_search with raw parameters:", JSON.stringify(rawParameters));
                const results = await (0, wiki_1.wiki_search)(rawParameters);
                // Check if there was an error
                if (results && results.error) {
                    return {
                        success: false,
                        message: results.message || "Failed to search Wikipedia"
                    };
                }
                return { success: true, results };
            }
            case "wiki_get_article_summary": {
                console.log("Calling wiki_get_article_summary with raw parameters:", JSON.stringify(rawParameters));
                const results = await (0, wiki_1.wiki_get_article_summary)(rawParameters);
                // Check if there was an error
                if (results && results.error) {
                    return {
                        success: false,
                        message: results.message || "Failed to get article summary"
                    };
                }
                return { success: true, results };
            }
            case "wiki_get_article_sections": {
                console.log("Calling wiki_get_article_sections with raw parameters:", JSON.stringify(rawParameters));
                const results = await (0, wiki_1.wiki_get_article_sections)(rawParameters);
                // Check if there was an error
                if (results && results.error) {
                    return {
                        success: false,
                        message: results.message || "Failed to get article sections"
                    };
                }
                return { success: true, results };
            }
            case "wiki_get_recent_searches": {
                console.log("Calling wiki_get_recent_searches with raw parameters:", JSON.stringify(rawParameters));
                const results = await (0, wiki_1.wiki_get_recent_searches)(local_1.default, rawParameters, meta);
                // Check if there was an error
                if (results && results.error) {
                    return {
                        success: false,
                        message: results.message || "Failed to get recent searches"
                    };
                }
                return { success: true, results };
            }
            default: {
                return {
                    success: false,
                    message: `Unknown function: ${name}`
                };
            }
        }
    }
    catch (e) {
        console.error(`Error in Wiki AI action ${name}:`, e);
        return {
            success: false,
            error: true,
            message: e instanceof Error ? e.message : String(e)
        };
    }
}
