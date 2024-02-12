import React, { FC, memo } from "react"
// Icons
import { MdContentCopy } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"
import { BiDislike } from "react-icons/bi"
import { IoReload } from "react-icons/io5"
//utils
import { copyToClipboard } from "@/common/utils"
//types
import { ANSWER_ACTION_BOX } from "@/types"

const AnswerActionBox: FC<ANSWER_ACTION_BOX> = ({
  feedbackAction,
  content,
  onFeedbackBtnClick,
  onRegenerateBtnClick,
  showRegenIcon = true
}) => {
  return (
    <div className="flex items-center justify-end gap-3 my-3 text-icons-light-secondary dark:text-icons-dark-secondary">
      <MdContentCopy
        size={18}
        className="mx-1 cursor-pointer"
        onClick={() => copyToClipboard(content)}
      />
      <AiOutlineLike
        size={18}
        className={`mx-1 cursor-pointer ${
          feedbackAction === "liked" ? "text-font-light-positive dark:text-font-dark-positive" : ""
        }`}
        onClick={() => onFeedbackBtnClick("liked")}
      />
      <BiDislike
        size={18}
        className={`mx-1 cursor-pointer ${
          feedbackAction === "disliked"
            ? "text-font-light-negative dark:text-font-dark-negative"
            : ""
        }`}
        onClick={() => onFeedbackBtnClick("disliked")}
      />
      {showRegenIcon && (
        <IoReload
          size={18}
          className="mx-1 cursor-pointer"
          onClick={() => onRegenerateBtnClick()}
        />
      )}
    </div>
  )
}
AnswerActionBox.displayName = "AnswerActionBox"
export default memo(AnswerActionBox)
