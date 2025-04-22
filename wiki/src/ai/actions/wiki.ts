//@ts-nocheck

// We'll define a function that tries to use the global fetch if available
// or falls back to using a URL-based approach that should work in most Node.js versions
const safeFetch = async (url, options = {}) => {
  try {
    // Try using the global fetch first
    return await fetch(url, options);
  } catch (error) {
    console.error("Global fetch not available, falling back to URL API", error);
    
    // If global fetch fails, fall back to a simpler approach using HTTP request
    // This requires Node.js but doesn't need 'node-fetch'
    return new Promise((resolve, reject) => {
      const https = require('https');
      const { URL } = require('url');
      
      const parsedUrl = new URL(url);
      
      const reqOptions = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Antispace Wikipedia Integration/1.0',
          ...(options.headers || {})
        }
      };
      
      const req = https.request(reqOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({
              ok: res.statusCode >= 200 && res.statusCode < 300,
              status: res.statusCode,
              json: () => Promise.resolve(jsonData)
            });
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        });
      });
      
      req.on('error', (e) => {
        reject(e);
      });
      
      req.end();
    });
  }
};

// Helper to recursively unwrap and parse parameters
const safeExtractParams = (params) => {
  console.log("Original params received:", params);
  
  if (!params) return {};
  
  // If it's an array with a single element, unwrap it
  if (Array.isArray(params) && params.length > 0) {
    console.log("Parameters are in an array, extracting first element:", params[0]);
    return safeExtractParams(params[0]);
  }
  
  // If it's a string, try to parse it
  if (typeof params === 'string') {
    try {
      // Check if it's a JSON array string that contains a JSON object string
      if (params.startsWith('[') && params.endsWith(']')) {
        console.log("String appears to be a JSON array, trying to parse it first");
        try {
          const arrayOfStrings = JSON.parse(params);
          if (Array.isArray(arrayOfStrings) && arrayOfStrings.length > 0) {
            console.log("Successfully parsed as array of strings:", arrayOfStrings[0]);
            // Now try to parse the first string element
            return safeExtractParams(arrayOfStrings[0]);
          }
        } catch (e) {
          console.log("Failed to parse as array JSON, trying as regular JSON");
        }
      }
      
      console.log("Attempting to parse string as JSON");
      const parsed = JSON.parse(params);
      console.log("Successfully parsed JSON:", parsed);
      return parsed;
    } catch (error) {
      console.error("Error parsing JSON string params:", error);
      return {};
    }
  }
  
  // Handle format where the parameter might be nested in a property
  if (params.query && typeof params.query === 'string') {
    console.log("Found query property directly in params:", params.query);
    return params;
  }
  
  // Sometimes the first property might be the parameter
  const keys = Object.keys(params);
  if (keys.length === 1) {
    const key = keys[0];
    console.log(`Found single key: ${key}, trying to use it as parameter:`, params[key]);
    // If the key is 'query', return the whole object
    if (key === 'query') {
      return params;
    }
    // Otherwise treat the single value as the query
    return { query: params[key] };
  }
  
  return params;
};

/**
 * Search Wikipedia for articles matching the query
 */
export async function wiki_search(params) {
  // Extract the parameters safely
  const extractedParams = safeExtractParams(params);
  console.log("Extracted params:", extractedParams);
  
  const query = extractedParams.query;
  const limit = extractedParams.limit || 5;
  
  if (!query) {
    console.error("No query provided for wiki_search");
    return { 
      results: [], 
      error: true, 
      message: "No search query provided" 
    };
  }
  
  try {
    console.log(`Searching Wikipedia for "${query}" with limit ${limit}`);
    // Add origin=* for CORS compatibility
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=${limit}&origin=*`;
    
    console.log(`Making request to URL: ${searchUrl}`);
    const response = await safeFetch(searchUrl, {
      headers: {
        'User-Agent': 'Antispace Wikipedia Integration/1.0'
      }
    });
    
    if (!response.ok) {
      return { 
        results: [], 
        error: true, 
        message: `Wikipedia API responded with status: ${response.status}` 
      };
    }
    
    const data = await response.json();
    console.log(`Received data from Wikipedia API:`, data);
    
    if (!data.query || !data.query.search) {
      return { results: [], message: "No results found" };
    }
    
    const results = data.query.search.map(item => ({
      title: item.title,
      snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
      pageid: item.pageid,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
    }));
    
    return results;
  } catch (error) {
    console.error("Error searching Wikipedia:", error);
    return { error: true, message: String(error) };
  }
}

/**
 * Get summary of a Wikipedia article by title
 */
export async function wiki_get_article_summary(params) {
  // Extract the parameters safely
  const extractedParams = safeExtractParams(params);
  console.log("Extracted summary params:", extractedParams);
  
  const title = extractedParams.title;
  
  if (!title) {
    console.error("No title provided for wiki_get_article_summary");
    return { 
      error: true, 
      message: "No article title provided" 
    };
  }
  
  try {
    console.log(`Getting summary for article: "${title}"`);
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    
    console.log(`Making request to URL: ${summaryUrl}`);
    const response = await safeFetch(summaryUrl, {
      headers: {
        'User-Agent': 'Antispace Wikipedia Integration/1.0'
      }
    });
    
    if (!response.ok) {
      return { 
        error: true, 
        message: `Wikipedia API responded with status: ${response.status}` 
      };
    }
    
    const data = await response.json();
    console.log(`Received summary data:`, data);
    
    if (data.type === "disambiguation") {
      return { 
        type: "disambiguation",
        title: data.title,
        extract: data.extract,
        message: "This is a disambiguation page. Please be more specific."
      };
    }
    
    return {
      title: data.title,
      extract: data.extract,
      thumbnail: data.thumbnail?.source,
      url: data.content_urls?.desktop?.page
    };
  } catch (error) {
    console.error("Error getting Wikipedia summary:", error);
    return { error: true, message: String(error) };
  }
}

/**
 * Get sections of a Wikipedia article by title
 */
export async function wiki_get_article_sections(params) {
  // Extract the parameters safely
  const extractedParams = safeExtractParams(params);
  console.log("Extracted sections params:", extractedParams);
  
  const title = extractedParams.title;
  
  if (!title) {
    console.error("No title provided for wiki_get_article_sections");
    return { 
      error: true, 
      message: "No title provided for article sections lookup" 
    };
  }
  
  try {
    console.log(`Getting sections for article: "${title}"`);
    // Add origin=* for CORS compatibility
    const sectionsUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=sections&format=json&origin=*`;
    
    console.log(`Making request to URL: ${sectionsUrl}`);
    const response = await safeFetch(sectionsUrl, {
      headers: {
        'User-Agent': 'Antispace Wikipedia Integration/1.0'
      }
    });
    
    if (!response.ok) {
      return { 
        error: true, 
        message: `Wikipedia API responded with status: ${response.status}` 
      };
    }
    
    const data = await response.json();
    console.log(`Received sections data:`, data);
    
    if (!data.parse || !data.parse.sections) {
      return { sections: [], message: "No sections found" };
    }
    
    // Safely map the sections with error handling
    const sections = data.parse.sections.map(section => {
      try {
        return {
          index: section.index,
          level: section.level,
          title: section.line || '',
          anchor: section.anchor || section.line || ''
        };
      } catch (e) {
        console.error(`Error processing section:`, section, e);
        return {
          index: '0',
          level: '0',
          title: 'Error processing section',
          anchor: ''
        };
      }
    }).filter(Boolean); // Remove any undefined entries
    
    const url = title ? 
      `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}` : 
      null;
    
    return {
      title: data.parse.title || title,
      sections,
      url
    };
  } catch (error) {
    console.error("Error getting Wikipedia article sections:", error);
    return { error: true, message: String(error) };
  }
}

/**
 * Get user's recent Wikipedia searches from local storage
 */
export async function wiki_get_recent_searches(db, params, meta) {
  // Extract the parameters safely
  const extractedParams = safeExtractParams(params);
  console.log("Extracted recent searches params:", extractedParams);
  
  const limit = extractedParams.limit || 10;
  
  try {
    console.log(`Getting recent searches with limit: ${limit}`);
    const userSearchKey = `${meta?.user?.id}:wiki_searches`;
    let searches = await db.get(userSearchKey) || [];
    
    console.log(`Found ${searches.length} recent searches`);
    
    // Return only the requested number of searches
    return searches.slice(0, limit);
  } catch (error) {
    console.error("Error getting recent searches:", error);
    return { error: true, message: String(error) };
  }
} 