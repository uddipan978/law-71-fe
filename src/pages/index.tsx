import {
  FC,
  useEffect,
  useState,
  FormEvent,
  KeyboardEvent,
  useMemo,
  useRef,
  useCallback
} from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { sortBy } from "lodash"
// Components
import { Button } from "@/common/atoms/form"
import ChatPromptBox from "@/common/atoms/ChatPromptBox"
import ChatResponseBox from "@/common/components/chat/chatDetails/ChatResponseBox"
// import RegenAnswerRatingBox from "@/common/components/chat/chatDetails/RegenAnswerRatingBox"
import ChatHumanPromptBox from "@/common/components/chat/chatDetails/ChatHumanPromptBox"
import ChatHistoryLoader from "@/common/components/ChatHistoryLoader"
// Layouts
import BlankLayout from "@/common/layouts/BlankLayout"
// Icons
import { FaSquare } from "react-icons/fa"
import { IoChatboxEllipses } from "react-icons/io5"
//utils
import {
  generateChatObject,
  generateChatPromptObject,
  generateChatResponseObject
} from "@/common/utils"
//APIs
import { chatAIApi } from "@/toolkit/chatAI/chat.api"
//hooks
import { useStreamChats } from "@/common/hooks/useStreamChats"
//types
import { CHAT_HISTORY } from "@/types"
//constants
import {
  CHAT_STREAM_API_ROUTE,
  CHAT_EDIT_PROMPT_API_ROUTE,
  CHAT_REGENERATE_RESPONSE_API_ROUTE
} from "@/common/constants/apiRoutes"
//redux
import { useSelector, useDispatch } from "react-redux"
import { chatAIState, setChatPrompt } from "@/toolkit/chatAI/chat.slice"

const IndividualChatPage: FC = () => {
  const chatBoxContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const chat_id = router.query.id as string
  const dispatch = useDispatch()
  const { chatPrompt } = useSelector(chatAIState)

  const { useLazyFetchChatHistoryQuery } = chatAIApi
  const [fetchChatHistory, { data, isFetching }] = useLazyFetchChatHistoryQuery()
  const [chat, setChat] = useState<string>("")
  const [messages, setMessages] = useState<CHAT_HISTORY[]>([])
  const [showLoader, setShowLoader] = useState(true)
  const [regenRatingBox, setRegenRatingBox] = useState({
    show: false,
    messageId: ""
  })
  const [lastStreamAction, setLastStreamAction] = useState("")

  //new chat
  const {
    messageStream,
    isStreaming,
    isStreamFinished,
    handleStartStreaming,
    handleStopStreaming
  } = useStreamChats()
  //regenerate response
  const {
    messageStream: regenerateStream,
    isStreaming: isRegenerating,
    isStreamFinished: isRegenerateFinished,
    handleStartStreaming: handleStartRegenerate,
    handleStopStreaming: handleStopRegenerating
  } = useStreamChats()
  //update prompt
  const {
    messageStream: updatedPromptStream,
    isStreaming: isPromptUpdating,
    isStreamFinished: isUpdatePromptFinished,
    handleStartStreaming: handleStartPromptUpdate,
    handleStopStreaming: handleStopStreamUpdating
  } = useStreamChats()

  const currentMessageStream = useMemo(() => {
    if (isStreaming || lastStreamAction === "NEW_CHAT") {
      return messageStream
    } else if (isRegenerating || lastStreamAction === "REGEN_CHAT") {
      return regenerateStream
    } else if (isPromptUpdating || lastStreamAction === "UPDATE_PROMPT") {
      return updatedPromptStream
    } else {
      return ""
    }
  }, [
    isStreaming,
    isRegenerating,
    isPromptUpdating,
    messageStream,
    regenerateStream,
    updatedPromptStream
  ])
  const isCurrentMessageStreaming = useMemo(
    () => isStreaming || isPromptUpdating || isRegenerating,
    [isStreaming, isPromptUpdating, isRegenerating]
  )
  const handleStopMessageStreaming = useCallback(
    async (message_id: string) => {
      if (isStreaming) {
        await handleStopStreaming()
      } else if (isPromptUpdating) {
        await handleStopStreamUpdating()
      } else if (isRegenerating) {
        await handleStopRegenerating()
      }
      const _messages = [...messages]
      const messageIndex = messages.findIndex((message) => message.message_id === message_id)
      const selectedConvIndex = _messages[messageIndex].conversations.findIndex(
        (conv) => conv.metadata.isGenerating
      )
      if (selectedConvIndex >= 0) {
        _messages[messageIndex].conversations[selectedConvIndex].metadata.isGenerating = false
        _messages[messageIndex].conversations[selectedConvIndex].content = messageStream
        setMessages(_messages)
      }
    },
    [isStreaming, isPromptUpdating, isRegenerating, messageStream]
  )
  const initiateChatStreaming = (_prompt: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      generateChatObject(parseInt(chat_id), _prompt, "chatAI") as CHAT_HISTORY
    ])
    handleStartStreaming(CHAT_STREAM_API_ROUTE, {
      text: _prompt,
      chat_id: parseInt(chat_id),
      type: "chatAI"
    })
    setLastStreamAction("NEW_CHAT")
  }
  const handleChatSubmit = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    initiateChatStreaming(chat)
    setChat("")
  }

  const handleOpenFeedbackBox = (feedbackAction: string, message_id: string) => {
    const _messages = [...messages]
    const messageIndex = messages.findIndex((message) => message.message_id === message_id)
    _messages[messageIndex].feedbackAction = feedbackAction
    setMessages(_messages)
  }
  const handleOpenRegenAnswerRatingBox = (showRegenRatingBox: boolean, messageId: string) => {
    setRegenRatingBox({
      show: showRegenRatingBox,
      messageId: messageId
    })
  }

  const handleRegenerate = (point_id: string, message_id: string) => {
    const _messages = [...messages]
    const index = _messages.findIndex((msg) => msg.message_id === message_id)
    _messages[index].conversations = [
      ..._messages[index].conversations,
      generateChatResponseObject(parseInt(chat_id), message_id, "chatAI")
    ]
    setMessages(_messages)
    handleStartRegenerate(`${CHAT_REGENERATE_RESPONSE_API_ROUTE}${point_id}`, {}, "GET")
    setLastStreamAction("REGEN_CHAT")
    handleOpenRegenAnswerRatingBox(true, message_id)
  }

  const handleUpdatePrompt = (updatedPrompt: string, message_id: string) => {
    const _messages = [...messages]
    const index = _messages.findIndex((msg) => msg.message_id === message_id)
    _messages[index].conversations = [
      ..._messages[index].conversations,
      ...generateChatPromptObject(parseInt(chat_id), message_id, updatedPrompt, "chatAI")
    ]
    setMessages(_messages)
    handleStartPromptUpdate(CHAT_EDIT_PROMPT_API_ROUTE, {
      text: updatedPrompt,
      chat_id: parseInt(chat_id),
      type: "chatAI",
      message_id
    })
    setLastStreamAction("UPDATE_PROMPT")
  }

  //set message history
  useEffect(() => {
    if (data) {
      const _messages = []
      for (const [key, conv] of Object.entries(data)) {
        _messages.push({
          message_id: key,
          conversations: sortBy(conv, (value) => value.metadata.timestamp),
          feedbackAction: "",
          showRegenRatingBox: regenRatingBox.messageId === key
        })
      }
      setMessages([..._messages])
      // setMessages(sortBy(_messages, (value) => value.conversations[0].metadata.timestamp))
    }
  }, [data])
  useEffect(() => {
    if (isStreamFinished || isRegenerateFinished || isUpdatePromptFinished) {
      setShowLoader(false)
      setTimeout(() => {
        fetchChatHistory(chat_id)
        dispatch(setChatPrompt(""))
      }, 2000)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreamFinished, isRegenerateFinished, isUpdatePromptFinished])
  useEffect(() => {
    if (chatPrompt.length) {
      initiateChatStreaming(chatPrompt)
    } else {
      fetchChatHistory(chat_id)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatPrompt, router])
  useEffect(() => {
    setShowLoader(true)
  }, [router])
  useEffect(() => {
    if (chatBoxContainerRef) {
      chatBoxContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end"
      })
    }
  }, [currentMessageStream, messages, chatBoxContainerRef])
  return (
    <BlankLayout>
      <Head>
        <title>LAW 71 | Chat</title>
      </Head>
      <div className='h-full flex flex-col justify-between relative'>
        <div className='px-32 pt-10 overflow-auto scrollbar-custom'>
          {isFetching && showLoader ? (
            <ChatHistoryLoader />
          ) : messages.length === 0 ? (
            <div className='flex justify-center items-center'>
              <IoChatboxEllipses size={20} className='text-brand-light dark:text-brand-dark' />
              <p className='ml-2 text-p1-regular text-font-light-primary dark:text-font-dark-primary'>
                No chat history found!
              </p>
            </div>
          ) : (
            <div ref={chatBoxContainerRef}>
              {messages.map(({ conversations, message_id, feedbackAction, showRegenRatingBox }) => (
                <div key={message_id}>
                  <ChatHumanPromptBox
                    onChangePrompt={(updatedPrompt) =>
                      handleUpdatePrompt(updatedPrompt, message_id)
                    }
                    conversations={conversations.filter(
                      (conv) => conv.metadata.initiator === "human"
                    )}
                  />
                  <ChatResponseBox
                    feedbackAction={feedbackAction}
                    showRegenRatingBox={showRegenRatingBox}
                    handleOpenFeedbackBox={(action) => handleOpenFeedbackBox(action, message_id)}
                    handleOpenRegenAnswerRatingBox={(show) =>
                      handleOpenRegenAnswerRatingBox(show, message_id)
                    }
                    handleRegenerate={(pointId) => handleRegenerate(pointId, message_id)}
                    message_id={message_id}
                    messageStream={currentMessageStream}
                    conversations={conversations.filter((conv) => conv.metadata.initiator === "ai")}
                  />
                  <div className='flex justify-center'>
                    {conversations.filter((conv) => conv.metadata.isGenerating).length > 0 && (
                      <Button
                        label='Stop Generating'
                        isLoading={false}
                        className='!w-auto mb-1 text-p2-medium text-font-light-primary dark:text-font-dark-primary px-2 py-1.5 fixed bottom-24 left-2/4 -translate-y-2/4 -translate-x-2/4'
                        iconClassName='text-font-light-positive'
                        appearance='secondary'
                        icon={FaSquare}
                        size='md'
                        onClick={() => handleStopMessageStreaming(message_id)}
                      />
                    )}
                  </div>
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
                isLoading={isCurrentMessageStreaming || isFetching}
              />
            </div>
          </div>
        </div>
      </div>
    </BlankLayout>
  )
}

export default IndividualChatPage
