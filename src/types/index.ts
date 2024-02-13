import { FormEvent, KeyboardEvent } from "react"
export interface CHATBOX {
  chat: string
  setChat: (chat: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => void
  isLoading?: boolean
}
export interface CHAT {
  point_id: string
  content: string
  metadata: {
    isGenerating: boolean
    chat_id: number
    chatName: string
    initiator: "ai" | "human"
    message_id: string
    timestamp: number
    type: "chatAI" | "review" | "draft"
    user_id: string
  }
}
export interface CHAT_HISTORY {
  message_id: string
  conversations: CHAT[]
  feedbackAction: string
  showRegenRatingBox: boolean
}
export interface CHAT_PROMPT {
  conversations: CHAT[]
}
export interface CHAT_RESPONSE_BOX {
  messageStream: string
  conversations: CHAT[]
}