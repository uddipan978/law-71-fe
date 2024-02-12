import React, { FC, memo, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
//Icons
import ChatLoadingIcon from "@/assets/images/icons/chat-loading-icon.svg";
//Components
import AnswerActionBox from "@/common/components/chat/chatDetails/AnswerActionBox";
import RatingBox from "@/common/components/chat/chatDetails/RatingBox";
import RegenAnswerRatingBox from "./RegenAnswerRatingBox";
import ChatPaginator from "@/common/atoms/ChatPaginator";
//utils
import { trim, map } from "lodash";
import { formatChatMessage } from "@/common/utils";
//types
import { CHAT_RESPONSE_BOX, CHAT } from "@/types";
const ChatResponseBox: FC<CHAT_RESPONSE_BOX> = ({
  message_id,
  messageStream,
  feedbackAction,
  showRegenRatingBox,
  handleOpenFeedbackBox,
  handleRegenerate,
  conversations,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<CHAT | null>(null);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(-1);
  const onChangePagination = (point_id: string) => {
    setSelectedConversation(conversations.find((conv) => conv.point_id === point_id) ?? null);
    setSelectedConversationIndex(conversations.findIndex((conv) => conv.point_id === point_id));
  };

  useEffect(() => {
    if (conversations.length) {
      const lastIndex = conversations.length - 1;
      const latestConv = conversations[lastIndex];
      setSelectedConversation(latestConv);
      setSelectedConversationIndex(lastIndex);
    }
  }, [conversations]);

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
                {!selectedConversation.metadata.isGenerating && (
                  <Fragment>
                    <div className='flex items-center gap-3'>
                      {conversations.length > 1 && (
                        <ChatPaginator
                          data={map(conversations, "point_id")}
                          selectedPoint={selectedConversation?.point_id ?? null}
                          onChange={onChangePagination}
                        />
                      )}
                      <AnswerActionBox
                        feedbackAction={feedbackAction}
                        content={selectedConversation.content}
                        onFeedbackBtnClick={(action) => handleOpenFeedbackBox(action)}
                        onRegenerateBtnClick={() => handleRegenerate(selectedConversation.point_id)}
                      />
                    </div>
                    {showRegenRatingBox && selectedConversationIndex > 0 && (
                      <RegenAnswerRatingBox
                        message_id={message_id}
                        point_id={selectedConversation.point_id}
                        onClose={() => setSelectedConversationIndex(-1)}
                      />
                    )}
                  </Fragment>
                )}
              </>
            )}
          </div>
        )}
        {feedbackAction !== "" && selectedConversation !== null && (
          <RatingBox
            feedbackAction={feedbackAction}
            onClose={() => handleOpenFeedbackBox("")}
            message_id={message_id}
            point_id={selectedConversation?.point_id}
          />
        )}
      </div>
    </div>
  );
};
ChatResponseBox.displayName = "ChatResponseBox";
export default memo(ChatResponseBox);
