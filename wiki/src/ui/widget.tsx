//@ts-nocheck
import { components as Anti, type AntispaceContext } from "@antispace/sdk"
import type { WikiAppUIActions } from "../../types"
import db from "../db/local"

/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
export default async function widgetUI(anti: AntispaceContext<WikiAppUIActions>) {
  const { action, values, meta } = anti
  
  // Get recent searches for this user
  const userSearchKey = `${meta?.user?.id}:wiki_searches`
  let recentSearches = await db.get(userSearchKey) || []
  
  switch (action) {
    case "set_api_key": {
      if (values.api_key) {
        await db.set(`${meta?.user?.id}:wiki_api_key`, values.api_key)
      }
      break
    }
    case "clear_search_history": {
      await db.set(userSearchKey, [])
      recentSearches = []
      break
    }
    default: {
      break
    }
  }

  return (
    <Anti.Column padding="medium">
      <Anti.Text type="heading1">Wikipedia</Anti.Text>
      <Anti.Text type="dim">
        Search and retrieve information from Wikipedia
      </Anti.Text>

      <Anti.Divider />
      
      <Anti.Text type="subheading">Recent Searches</Anti.Text>
      
      {recentSearches.length > 0 ? (
        <>
          {recentSearches.slice(0, 5).map((search, index) => (
            <Anti.Row key={index} type="text" justify="space-between">
              <Anti.Text type="text">{search.query}</Anti.Text>
              <Anti.Text type="dim">{new Date(search.timestamp).toLocaleString()}</Anti.Text>
            </Anti.Row>
          ))}
          <Anti.Button
            action="clear_search_history"
            text="Clear History"
            variant="secondary"
          />
        </>
      ) : (
        <Anti.Text type="dim">No recent searches</Anti.Text>
      )}
      
      <Anti.Divider />
      
      <Anti.Text type="subheading">API Settings</Anti.Text>
      <Anti.Text type="dim">
        WikiMedia API doesn't require a key for most operations,
        but you can set one if needed for specialized access.
      </Anti.Text>
      <Anti.Input placeholder="API Key (optional)" name="api_key" />
      <Anti.Button
        action="set_api_key"
        text="Save API Key"
        variant="secondary"
      />
    </Anti.Column>
  )
}
