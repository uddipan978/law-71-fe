import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
  toast.info("Text copied to clipboard")
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