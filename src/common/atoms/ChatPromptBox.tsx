import React, { FC, memo, useState, useMemo, useRef, KeyboardEvent } from "react";
//icons
import { HiPaperAirplane } from "react-icons/hi2";
//hooks
import useAutosizeTextArea from "@/common/hooks/useAutosizeTextArea";

//types
import { CHATBOX } from "@/types";

const ChatPromptBox: FC<CHATBOX> = ({ chat, setChat, onSubmit, isLoading }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isFocused, setFocused] = useState(false);
  useAutosizeTextArea(textAreaRef.current, chat);

  const borderColorClass = useMemo(() => {
    if (isFocused) {
      return ` border-controls-light-primary-active dark:border-controls-dark-primary-active`;
    } else {
      return ` border-fill-light-stroke dark:border-fill-dark-stroke`;
    }
  }, [isFocused]);
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      //Stops enter from creating a new line
      e.preventDefault();
      if (chat.trim().length > 0) {
        onSubmit(e);
      }
    }
  };
  return (
    <form
      className={`border-2 ${borderColorClass} rounded-lg flex items-center justify-between py-3`}
      ref={formRef}
      onSubmit={onSubmit}>
      <textarea
        ref={textAreaRef}
        name=''
        id=''
        className='pl-3 !outline-none !bg-transparent w-full'
        placeholder='How can I help you...'
        autoFocus
        style={{ resize: "none" }}
        rows={1}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={chat}
        disabled={isLoading}
        onChange={(e) => setChat(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className='text-icons-dark-secondary dark:tex-icons-light-secondary p-1 ml-auto mr-2 cursor-pointer hover:text-brand-light dark:hover:text-brand-dark disabled:cursor-default disabled:hover:text-icons-dark-secondary'
        disabled={chat.trim().length === 0 || isLoading}
        type='submit'>
        <HiPaperAirplane size={22} />
      </button>
    </form>
  );
};
ChatPromptBox.displayName = "ChatPromptBox";
export default memo(ChatPromptBox);
