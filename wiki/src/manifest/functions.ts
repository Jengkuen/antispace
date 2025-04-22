//@ts-nocheck
import type { AntispaceAppFunction } from "@antispace/sdk"

/**
 * Function to set the user's nickname
 */
export const set_nickname: AntispaceAppFunction<
  "set_nickname",
  {
    nickname: string
  }
> = {
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
}

export const say_nickname: AntispaceAppFunction<"say_nickname"> = {
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
}

/**
 * Function to search Wikipedia for articles
 */
export const wiki_search: AntispaceAppFunction<
  "wiki_search",
  {
    query: string;
    limit?: number;
  }
> = {
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
export const wiki_get_article_summary: AntispaceAppFunction<
  "wiki_get_article_summary",
  {
    title: string;
  }
> = {
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
export const wiki_get_article_sections: AntispaceAppFunction<
  "wiki_get_article_sections",
  {
    title: string;
  }
> = {
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
export const wiki_get_recent_searches: AntispaceAppFunction<
  "wiki_get_recent_searches",
  {
    limit?: number;
  }
> = {
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
