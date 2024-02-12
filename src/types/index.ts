import React, { FormEvent, KeyboardEvent, ReactNode } from "react"
import { IconType } from "react-icons"
//enums
import { SPINNER_APPEARANCE } from "@/common/constants/enums"
import { StaticImageData } from "next/image"

export interface BUTTON {
  type?: "button" | "submit" | "reset"
  appearance?: "primary" | "white" | "secondary" | "ghost" | "negative" | "primary-outline"
  size?: "md" | "lg"
  className?: string
  iconClassName?: string
  labelClassName?: string
  disabled?: boolean
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  icon?: IconType
  iconDirection?: string
}
export interface INPUTBOX {
  type: string
  name: string
  id?: string
  className?: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onClear?: () => void
  required?: boolean
  label?: string | null
  helpText?: string | null
  disabled?: boolean
  isError?: boolean
  isSuccess?: boolean
  autoFocus?: boolean
  inputWrapperClassName?: string
  showRightIcon?: boolean
}
export interface SPINNER {
  size: "sm" | "md" | "lg"
  appearance: SPINNER_APPEARANCE
}
export interface FORM_ALERT {
  content: string
  type: "success" | "error" | "info"
}
export interface CHECKBOX {
  title: string
  checked?: boolean
  onChange: (checked: boolean) => void
  containerClassname?: string
  id: string
}

export interface CHATBOX {
  chat: string
  setChat: (chat: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => void
  isLoading?: boolean
}
export interface RADIO_OPTION {
  value: string
  label: string
  className?: string
  disabled?: boolean
}
export interface RADIO_GROUP {
  options: RADIO_OPTION[]
  value: string
  onChange: (value: string) => void
}
export interface SELECT_DROPDOWN {
  options: RADIO_OPTION[]
  value: string
  onSelect: (value: string, label?: string) => void
  placeholder?: string
  btnClassName?: string
  wrapperClassName?: string
  placeholderClassName?: string
  isLoading?: boolean
  isError?: boolean
  helpText?: string
}
export interface CHAT_PAGINATOR {
  data: string[]
  selectedPoint: string | null
  onChange: (point_id: string) => void
}
//Chat
export interface CHAT_LIST {
  user_id: string
  type: string
  name: string
  id: number
  documents?: REVIEW_DOCUMENT[]
  created_at: string
  group?: string
}
export interface PAGINATE_RESPONSE<T> {
  result: {
    pages: number
    total: number
    next?: {
      page: number
      limit: number
    }
    prev?: {
      page: number
      limit: number
    }
    results: T[]
  }
}
export interface CREATE_CHAT_API_RESP {
  result: CHAT_LIST & {
    id: number
    created_at: string
    updated_at: string
  }
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
export interface CHAT_HISTORY_API_RESP {
  result: {
    count: number
    data: {
      [key: string]: CHAT[]
    }
  }
}
export interface CHAT_HISTORY_OBJ {
  [key: string]: CHAT[]
}
export interface CHAT_HISTORY {
  message_id: string
  conversations: CHAT[]
  feedbackAction: string
  showRegenRatingBox: boolean
}
export interface DELETE_CHAT_API_RESP {
  result: {
    id: number
    name: string
    user_id: string
    type: string
  }
}
export interface DELETE_CHAT_API_PAYLOAD {
  chat_id: number
  index: number
  group: string
}
interface FEEDBACK {
  rating?: number
  short_message?: string
  additional_message?: string
  regenerate_feedback?: string
}
export interface FEEDBACK_API_PAYLOAD extends FEEDBACK {
  message_id: string
  point_id: string
}
export interface FEEDBACK_API_RESP {
  feedback: Partial<FEEDBACK>
  id: number
  message_id: string
  created_at: string
  updated_at: string
}
export interface RATING_BOX {
  feedbackAction: string
  onClose: () => void
  message_id: string
  point_id: string
}
export interface RENAME_CHAT_API_PAYLOAD {
  chat_id: number
  name: string
  index: number
}
export interface ANSWER_ACTION_BOX {
  feedbackAction: string
  content: string
  onFeedbackBtnClick: (action: string) => void
  onRegenerateBtnClick: () => void
  showRegenIcon?: boolean
}
export interface CHAT_PROMPT {
  conversations: CHAT[]
  onChangePrompt: (prompt: string) => void
  showEditIcon?: boolean
}
export interface FETCH_CHAT_API_PAYLOAD {
  page?: number
  type: string
}
export interface SEARCH_CHAT_API_PAYLOAD {
  searchKey: string
  type: string
}
export interface CHAT_RESPONSE_BOX {
  message_id: string
  messageStream: string
  feedbackAction: string
  showRegenRatingBox: boolean
  handleOpenFeedbackBox: (action: string) => void
  handleOpenRegenAnswerRatingBox: (show: boolean) => void
  handleRegenerate: (point_id: string) => void
  conversations: CHAT[]
}
export interface REGEN_ANSWER_RATING_BOX {
  point_id: string
  message_id: string
  onClose: () => void
}
export interface REVIEW_DOCUMENT {
  key: string
  mimetype: string
  originalname: string
  initialMimetype: string | null
  documentSignedUrl: string
}
