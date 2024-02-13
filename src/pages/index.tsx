import { FC, useEffect, useState, FormEvent, KeyboardEvent, useRef } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
// Components
import ChatPromptBox from "@/common/atoms/ChatPromptBox"
import ChatResponseBox from "@/common/components/chat/chatDetails/ChatResponseBox"
import ChatHumanPromptBox from "@/common/components/chat/chatDetails/ChatHumanPromptBox"
// Layouts
import BlankLayout from "@/common/layouts/BlankLayout"
// Icons
import { IoChatboxEllipses } from "react-icons/io5"
//utils
import { generateChatObject } from "@/common/utils"
//hooks
import { useStreamChats } from "@/common/hooks/useStreamChats"
//types
import { CHAT_HISTORY } from "@/types"
//constants
import { CHAT_STREAM_API_ROUTE } from "@/common/constants/apiRoutes"

const IndividualChatPage: FC = () => {
  const chatBoxContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const chat_id = router.query.id as string
  const [chat, setChat] = useState<string>("")
  const [messages, setMessages] = useState<CHAT_HISTORY[]>([])
  const [currentMessageId, setCurrentMessageId] = useState<null | string>(null)
  //new chat
  const { messageStream, isStreaming, isStreamFinished, handleStartStreaming } = useStreamChats()
  const initiateChatStreaming = (_prompt: string) => {
    const newMessage = generateChatObject(parseInt(chat_id), _prompt, "chatAI") as CHAT_HISTORY
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setCurrentMessageId(newMessage.message_id)
    handleStartStreaming(CHAT_STREAM_API_ROUTE, {
      text: _prompt,
      init: messages.length === 0
    })
  }
  const handleChatSubmit = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    initiateChatStreaming(chat)
    setChat("")
  }
  useEffect(() => {
    if (chatBoxContainerRef) {
      chatBoxContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end"
      })
    }
  }, [messageStream, messages, chatBoxContainerRef])
  useEffect(() => {
    if (isStreamFinished && messages.length) {
      const _messages = [...messages]
      const index = _messages.findIndex((message) => message.message_id === currentMessageId)
      if (index > -1) {
        _messages[index].conversations.map((conv) => {
          if (conv.metadata.initiator === "ai" && conv.metadata.isGenerating) {
            conv.metadata.isGenerating = false
            conv.content = messageStream
          }
        })
        setMessages([..._messages])
      }
    }
  }, [isStreamFinished])
  return (
    <BlankLayout>
      <Head>
        <title>LAW 71 | Chat</title>
      </Head>
      <div className='h-full flex flex-col justify-between relative'>
        <div className='px-32 pt-10 overflow-auto scrollbar-custom'>
          {messages.length === 0 ? (
            <div className='flex justify-center items-center'>
              <IoChatboxEllipses size={20} className='text-brand-light dark:text-brand-dark' />
              <p className='ml-2 text-p1-regular text-font-light-primary dark:text-font-dark-primary'>
                No chat history found!
              </p>
            </div>
          ) : (
            <div ref={chatBoxContainerRef}>
              {messages.map(({ conversations }, i) => (
                <div key={i}>
                  <ChatHumanPromptBox
                    conversations={conversations.filter(
                      (conv) => conv.metadata.initiator === "human"
                    )}
                  />
                  <ChatResponseBox
                    messageStream={messageStream}
                    conversations={conversations.filter((conv) => conv.metadata.initiator === "ai")}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='sticky bottom-0 start-0 end-0 bg-transparent'>
          <div className='px-6 py-5 border-t border-controls-light-tertiary-active dark:controls-dark-tertiary-active sticky bottom-0 start-0 end-0 bg-fill-light-primary dark:bg-fill-dark-primary rounded-b-[32px]'>
            <div className='mx-32'>
              <ChatPromptBox
                chat={chat}
                setChat={setChat}
                onSubmit={handleChatSubmit}
                isLoading={isStreaming}
              />
            </div>
          </div>
        </div>
      </div>
    </BlankLayout>
  )
}

export default IndividualChatPage
