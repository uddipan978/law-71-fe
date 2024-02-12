import React, { FC } from "react"
import Spinner from "@/common/atoms/Spinner"
//constants
import { SPINNER_APPEARANCE } from "@/common/constants/enums"
const ChatHistoryLoader: FC = () => {
  return (
    <div className="flex justify-center items-start w-full">
      <Spinner appearance={SPINNER_APPEARANCE.success} size="md" />
      <p className="ml-2 text-p1-regular text-font-light-primary dark:text-font-dark-primary">
        Fetching chat history...
      </p>
    </div>
  )
}
export default ChatHistoryLoader
