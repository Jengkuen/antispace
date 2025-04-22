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
