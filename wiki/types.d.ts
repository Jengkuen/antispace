export type MyAppUIActions = {
  set_nickname: { nickname: string }
  say_nickname: {}
}

export type WikiAppUIActions = {
  set_api_key: { api_key: string }
  search_history: {}
  clear_search_history: {}
}
