import React, { FC, memo, useEffect } from "react"
import { toast } from "react-toastify"
//icons
import { AiOutlineLike } from "react-icons/ai"
import { BiDislike } from "react-icons/bi"
import { LuCircleEqual } from "react-icons/lu"
//API
import { chatAIApi } from "@/toolkit/chatAI/chat.api"
//types
import { REGEN_ANSWER_RATING_BOX } from "@/types"
const RegenAnswerRatingBox: FC<REGEN_ANSWER_RATING_BOX> = ({ point_id, message_id, onClose }) => {
  const { useSubmitFeedbackMutation } = chatAIApi
  const [submitFeedback, { isSuccess, isError }] = useSubmitFeedbackMutation()
  const handleSubmitFeedback = (feedback: string) => {
    submitFeedback({
      message_id,
      point_id,
      regenerate_feedback: feedback
    })
  }
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong!")
    }
  }, [isError])
  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess])
  return (
    <div className="flex items-center justify-between bg-fill-light-primary-elevated  dark:bg-fill-dark-primary-elevated p-6 rounded-xl self-stretch">
      <p className="text-font-light-primary dark:text-font-dark-primary">
        Was this response better or worse?
      </p>
      <div className="flex items-center">
        <div
          className="flex items-center mr-3 cursor-pointer"
          onClick={() => handleSubmitFeedback("better")}>
          <AiOutlineLike
            size={18}
            className="mx-1 text-icons-light-secondary dark:text-icons-dark-secondary mr-2"
          />{" "}
          <p className="text-p1-regular text-font-light-primary dark:text-font-dark-primary">
            Better
          </p>
        </div>
        <div
          className="flex items-center mr-3 cursor-pointer"
          onClick={() => handleSubmitFeedback("worse")}>
          <BiDislike
            size={18}
            className="mx-1 text-icons-light-secondary dark:text-icons-dark-secondary mr-2"
          />{" "}
          <p className="text-p1-regular text-font-light-primary dark:text-font-dark-primary">
            Worse
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleSubmitFeedback("same")}>
          <LuCircleEqual
            size={18}
            className="mx-1 text-icons-light-secondary dark:text-icons-dark-secondary mr-2"
          />{" "}
          <p className="text-p1-regular text-font-light-primary dark:text-font-dark-primary">
            Same
          </p>
        </div>
      </div>
    </div>
  )
}
RegenAnswerRatingBox.displayName = "RegenAnswerRatingBox"
export default memo(RegenAnswerRatingBox)
