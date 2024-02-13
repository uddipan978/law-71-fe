import React, { FC, memo, useEffect, useState } from "react"
//components
import Avatar from "@/common/atoms/avatar"
//types
import { CHAT_PROMPT, CHAT } from "@/types"
const ChatHumanPromptBox: FC<CHAT_PROMPT> = ({ conversations }) => {
  const [selectedConversation, setSelectedConversation] = useState<CHAT | null>(null)
  useEffect(() => {
    if (conversations.length) {
      const latestConv = conversations[conversations.length - 1]
      setSelectedConversation(latestConv)
    }
  }, [conversations])
  return conversations.length ? (
    <div className='flex justify-between mb-6'>
      <div className='flex'>
        <div className='mr-6'>
          <Avatar text='A' />
        </div>
        <div className='mt-1'>
          <p className='text-p1-regular text-font-light-primary dark:text-font-dark-primary'>
            {selectedConversation?.content}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
ChatHumanPromptBox.displayName = "ChatHumanPromptBox"
export default memo(ChatHumanPromptBox)
