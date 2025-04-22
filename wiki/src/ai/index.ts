import type { AntispaceAIRequest } from "@antispace/sdk"
import type manifest from "../manifest"

export default async function aiActions({ name, parameters, meta }: AntispaceAIRequest<typeof manifest>) {
  console.log("AI Action called:", name)
  console.log("Parameters and metadata:", parameters, meta)

  switch (name) {
    case "set_nickname": {
      const { nickname } = parameters

      try {
        console.log("Setting nickname:", nickname)
        return { success: true, nickname }
      } catch (e: any) {
        return {
          error: e.message || e.to,
        }
      }
    }

    case "say_nickname": {
      console.log("Say nickname command called")

      return { success: true }
    }

    default: {
      break
    }
  }
}
