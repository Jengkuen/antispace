"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wiki_get_recent_searches = exports.wiki_get_article_sections = exports.wiki_get_article_summary = exports.wiki_search = exports.say_nickname = exports.set_nickname = void 0;
/**
 * Function to set the user's nickname
 */
exports.set_nickname = {
    type: "function",
    function: {
        name: "set_nickname",
        description: "Set user's nickname",
        parameters: {
            type: "object",
            properties: {
                nickname: {
                    type: "string",
                    description: "Nickname string",
                },
            },
            required: ["nickname"],
        },
    },
};
exports.say_nickname = {
    type: "function",
    function: {
        name: "say_nickname",
        description: "Echo back the user's nickname",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
};
/**
 * Function to search Wikipedia for articles
 */
exports.wiki_search = {
    type: "function",
    function: {
        name: "wiki_search",
        description: "Search Wikipedia for articles matching the query",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to find Wikipedia articles",
                },
                limit: {
                    type: "number",
                    description: "Maximum number of results to return (default: 5)",
                },
            },
            required: ["query"],
        },
    },
};
/**
 * Function to get summary of a Wikipedia article
 */
exports.wiki_get_article_summary = {
    type: "function",
    function: {
        name: "wiki_get_article_summary",
        description: "Get summary of a Wikipedia article by title",
        parameters: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "The title of the Wikipedia article",
                },
            },
            required: ["title"],
        },
    },
};
/**
 * Function to get sections of a Wikipedia article
 */
exports.wiki_get_article_sections = {
    type: "function",
    function: {
        name: "wiki_get_article_sections",
        description: "Get sections of a Wikipedia article by title",
        parameters: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "The title of the Wikipedia article",
                },
            },
            required: ["title"],
        },
    },
};
/**
 * Function to get user's recent Wikipedia searches
 */
exports.wiki_get_recent_searches = {
    type: "function",
    function: {
        name: "wiki_get_recent_searches",
        description: "Get user's recent Wikipedia searches",
        parameters: {
            type: "object",
            properties: {
                limit: {
                    type: "number",
                    description: "Maximum number of recent searches to return (default: 10)",
                },
            },
            required: [],
        },
    },
};
