import { components as Anti, type AntispaceContext } from "@antispace/sdk"
import type { MyAppUIActions } from "../../types"

/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
export default async function widgetUI(anti: AntispaceContext<MyAppUIActions>) {
  const { action, values, meta } = anti

  console.log({ action, values, meta })

  return (
    <Anti.Column>
      <Anti.Text type="heading1">Hello, Antispace!</Anti.Text>
    </Anti.Column>
  )
}
