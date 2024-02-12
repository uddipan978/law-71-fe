import React, { FC, memo, useEffect, useState } from "react"
import { map } from "lodash"
//components
import Avatar from "@/common/atoms/avatar"
import { InputBox, Button } from "@/common/atoms/form"
import ChatPaginator from "@/common/atoms/ChatPaginator"
// Icons
import { CiEdit } from "react-icons/ci"
import { FiX } from "react-icons/fi"
//types
import { CHAT_PROMPT, CHAT } from "@/types"
const ChatHumanPromptBox: FC<CHAT_PROMPT> = ({
  conversations,
  onChangePrompt,
  showEditIcon = true
}) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [chatPrompt, setChatPrompt] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<CHAT | null>(null)
  const onClickUpdateBtn = () => {
    onChangePrompt(chatPrompt)
    setShowEditForm(false)
  }
  const onChangePagination = (point_id: string) => {
    setSelectedConversation(conversations.find((conv) => conv.point_id === point_id) ?? null)
  }
  useEffect(() => {
    if (conversations.length) {
      const latestConv = conversations[conversations.length - 1]
      setSelectedConversation(latestConv)
      setChatPrompt(latestConv.content)
    }
  }, [conversations])
  return conversations.length ? (
    <div className="flex justify-between mb-6">
      {showEditForm ? (
        <div className="flex items-center gap-3.5 self-stretch py-1.5 w-full">
          <Avatar text="A" />
          <InputBox
            value={chatPrompt}
            onChange={(e) => setChatPrompt(e.target.value)}
            name="chat-prompt"
            type="text"
            autoFocus={true}
          />
          <div className="flex items-start gap-1.5">
            <Button label="Update" size="lg" onClick={onClickUpdateBtn} />
            <Button
              label=""
              size="lg"
              appearance="secondary"
              icon={FiX}
              onClick={() => setShowEditForm(false)}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex">
            <div className="mr-6">
              <Avatar text="A" />
            </div>
            <div className="mt-1">
              <p className="text-p1-regular text-font-light-primary dark:text-font-dark-primary">
                {selectedConversation?.content}
              </p>
              {conversations.length > 1 && (
                <ChatPaginator
                  data={map(conversations, "point_id")}
                  selectedPoint={selectedConversation?.point_id ?? null}
                  onChange={onChangePagination}
                />
              )}
            </div>
          </div>
          {showEditIcon && (
            <div className="h-6 w-6 mt-1 ms-1.5">
              <CiEdit
                size={24}
                className="text-icons-light-secondary dark:text-icons-dark-secondary cursor-pointer"
                onClick={() => setShowEditForm(true)}
              />
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <></>
  )
}
ChatHumanPromptBox.displayName = "ChatHumanPromptBox"
export default memo(ChatHumanPromptBox)
