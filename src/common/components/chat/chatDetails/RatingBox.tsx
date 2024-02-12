import { FC, useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
//icons
import { FiX } from "react-icons/fi"
//components
import { Button, InputBox, RadioGroup } from "@/common/atoms/form"
//data
import { POSITIVE_FEEDBACK_OPTIONS, NEGATIVE_FEEDBACK_OPTIONS } from "@/common/constants/data"
//types
import { RATING_BOX } from "@/types"
//API
import { chatAIApi } from "@/toolkit/chatAI/chat.api"

const RatingBox: FC<RATING_BOX> = ({ feedbackAction, message_id, point_id, onClose }) => {
  const { useSubmitFeedbackMutation } = chatAIApi
  const [submitFeedback, { isLoading, isSuccess, isError }] = useSubmitFeedbackMutation()
  const [ratingTag, setRatingTag] = useState("")
  const [feedback, setFeedback] = useState("")

  const RADIO_OPTIONS = useMemo(
    () => (feedbackAction === "liked" ? POSITIVE_FEEDBACK_OPTIONS : NEGATIVE_FEEDBACK_OPTIONS),
    [feedbackAction]
  )

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    submitFeedback({
      message_id: message_id,
      rating: feedbackAction === "liked" ? 1 : 0,
      short_message: ratingTag,
      additional_message: feedback,
      point_id
    })
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Thank you for your valuable feedback.")
      onClose()
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong! Please try again later")
    }
  }, [isError])
  useEffect(() => {
    setRatingTag(RADIO_OPTIONS[0].value)
  }, [RADIO_OPTIONS])
  return (
    <form onSubmit={handleSubmitFeedback}>
      <div className="bg-fill-light-disabled dark:bg-fill-dark-disabled flex flex-col justify-center items-start gap-3 rounded-xl pt-3.5 pr-4 pb-5 pl-4">
        <div className="flex justify-between self-stretch">
          <p className="text-p1-medium text-font-light-primary-3 dark:text-font-dark-primary-3">
            Why did you choose this rating? (optional)
          </p>
          <div
            className="flex w-8 h-8 p-1 justify-center items-center bg-controls-light-tertiary-active dark:bg-controls-light-tertiary-active cursor-pointer"
            onClick={onClose}>
            <FiX size={24} className="text-icons-light-primary dark:text-icons-dark-primary" />
          </div>
        </div>
        <p className="text-font-light-secondary dark:text-font-dark-secondary text-p1-regular">
          Your feedback will help us improve the bots.
        </p>
        <RadioGroup
          options={RADIO_OPTIONS}
          value={ratingTag}
          onChange={(value) => setRatingTag(value)}
        />
        <InputBox
          type="textarea"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Provide additional feedback"
          autoFocus={true}
        />
        <Button label="Submit" size="lg" className="!w-40" isLoading={isLoading} type="submit" />
      </div>
    </form>
  )
}
export default RatingBox
