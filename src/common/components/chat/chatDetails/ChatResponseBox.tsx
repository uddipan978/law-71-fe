import React, { FC, memo, useState, useEffect } from "react"
import Image from "next/image"
import Markdown from "react-markdown"
//Icons
import ChatLoadingIcon from "@/assets/images/icons/chat-loading-icon.svg"
//utils
import { trim } from "lodash"
import { formatChatMessage } from "@/common/utils"
//types
import { CHAT_RESPONSE_BOX, CHAT } from "@/types"
const ChatResponseBox: FC<CHAT_RESPONSE_BOX> = ({ messageStream, conversations }) => {
  const [selectedConversation, setSelectedConversation] = useState<CHAT | null>(null)
  useEffect(() => {
    if (conversations.length) {
      const lastIndex = conversations.length - 1
      const latestConv = conversations[lastIndex]
      setSelectedConversation(latestConv)
    }
  }, [conversations])

  return (
    <div className='flex mb-6'>
      <div className='mr-4 w-auto mt-4'>
        <Image
          src='/favicon.png'
          width={29}
          height={18}
          alt='Favicon Logo'
          className='!max-w-none'
        />
      </div>
      <div
        className={`flex flex-col w-${
          selectedConversation?.metadata.isGenerating ? "auto" : "[-webkit-fill-available]"
        } gap-2`}>
        {selectedConversation && (
          <div className='bg-fill-light-disabled dark:bg-fill-dark-disabled flex flex-col justify-center items-start gap-3 rounded-xl pt-3.5 pr-4 pb-5 pl-4'>
            {selectedConversation.metadata.isGenerating && messageStream.length === 0 ? (
              <Image src={ChatLoadingIcon} width={28} height={18} alt='Favicon Logo' />
            ) : (
              <>
                <Markdown className='text-p1-regular text-font-light-primary-3 dark:text-font-dark-primary chat-markdown'>
                  {selectedConversation.metadata.isGenerating
                    ? messageStream
                    : formatChatMessage(trim(selectedConversation.content))}
                </Markdown>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
ChatResponseBox.displayName = "ChatResponseBox"
export default memo(ChatResponseBox)
