import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import { groupBy, uniqueId } from "lodash"
import dayjs from "dayjs"
//types
import { CHAT, CHAT_LIST } from "@/types"

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
  toast.info("Text copied to clipboard")
}
export const generateChatResponseObject = (
  chat_id: number,
  message_id: string,
  type: "chatAI" | "review" | "draft"
): CHAT => {
  return {
    point_id: uuidv4(),
    content: "",
    metadata: {
      isGenerating: true,
      chat_id,
      chatName: "",
      initiator: "ai",
      message_id,
      timestamp: Date.now(),
      type,
      user_id: ""
    }
  }
}
export const generateChatPromptObject = (
  chat_id: number,
  message_id: string,
  prompt: string,
  type: "chatAI" | "review" | "draft"
): CHAT[] => {
  return [
    {
      point_id: uuidv4(),
      content: prompt ?? "",
      metadata: {
        isGenerating: false,
        chat_id,
        chatName: "",
        initiator: "human",
        message_id,
        timestamp: Date.now(),
        type,
        user_id: ""
      }
    },
    {
      point_id: uuidv4(),
      content: "",
      metadata: {
        isGenerating: true,
        chat_id,
        chatName: "",
        initiator: "ai",
        message_id,
        timestamp: Date.now(),
        type,
        user_id: ""
      }
    }
  ]
}
export const generateChatObject = (
  chat_id: number,
  prompt: string,
  type: string,
  skipPrompt?: boolean
) => {
  const message_id = uuidv4()
  const conversations = []
  if (!skipPrompt) {
    conversations.push({
      point_id: uuidv4(),
      content: prompt ?? "",
      metadata: {
        isGenerating: false,
        chat_id,
        chatName: "",
        initiator: "human",
        message_id,
        timestamp: Date.now(),
        type,
        user_id: ""
      }
    })
  }
  conversations.push({
    point_id: uuidv4(),
    content: "",
    metadata: {
      isGenerating: true,
      chat_id,
      chatName: "",
      initiator: "ai",
      message_id,
      timestamp: Date.now(),
      type,
      user_id: ""
    }
  })
  return {
    message_id,
    feedbackAction: "",
    conversations
  }
}

export const formatChatMessage = (message: string) => {
  const rx = /```.*?```|`([^`\n]+)`/g
  let formattedText = message.replace(rx, (_, match) => `<strong>${match}</strong>`)
  formattedText = formattedText.replace(
    /```javascript([^`]+)```/g,
    (_, match) => `<code>${match}</code>`
  )
  formattedText = formattedText.replace(/```jsx([^`]+)```/g, (_, match) => `<code>${match}</code>`)
  formattedText = formattedText.replace(/```markdown([^`]+)```/g, (_, match) => match)
  return formattedText
}
export const groupChatsByDate = (chats: CHAT_LIST[]) => {
  const last7Days = dayjs().subtract(7, "days")
  const last30Days = dayjs().subtract(30, "days")
  const structuredObjects = groupBy(chats, (item) => {
    const chatDate = dayjs(item.created_at)
    if (chatDate.isSame(dayjs(), "date")) {
      return "Today"
    } else if (chatDate.isAfter(last7Days, "date")) {
      return "Previous 7 days"
    } else if (chatDate.isAfter(last30Days, "date")) {
      return "Previous 30 days"
    } else {
      return chatDate.year().toString()
    }
  })
  return structuredObjects
}

export const generateChatGroupObject = (groupName: string, item: CHAT_LIST) => {
  return {
    id: parseInt(uniqueId()),
    name: groupName,
    user_id: "",
    type: "group",
    created_at: dayjs(item.created_at).add(1, "minute").toISOString(),
    updated_at: dayjs(item.created_at).add(1, "minute").toISOString()
  }
}
