import React, { FC, useMemo, memo } from "react"
import { findIndex } from "lodash"
//icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
//types
import { CHAT_PAGINATOR } from "@/types"
const ChatPaginator: FC<CHAT_PAGINATOR> = ({ data, selectedPoint, onChange }) => {
  const selectedIndex = useMemo(() => {
    if (selectedPoint) {
      return findIndex(data, (d) => d === selectedPoint) + 1
    } else {
      return 0
    }
  }, [selectedPoint, data])
  const handlePrevNext = (action: string) => {
    if (action === "PREV" && selectedIndex > 1) {
      onChange(data[selectedIndex - 2])
    } else if (action === "NEXT" && selectedIndex < data.length) {
      onChange(data[selectedIndex])
    }
  }
  return (
    <div className="flex items-center gap-1 mt-1">
      <FiChevronLeft
        className={`${selectedIndex <= 1 ? "text-controls-light-inactive" : "cursor-pointer"}`}
        onClick={() => handlePrevNext("PREV")}
      />
      <p className="text-p2-regular text-font-light-secondary dark:text-font-dark-secondary">
        {selectedIndex}/{data.length}
      </p>
      <FiChevronRight
        className={`${
          selectedIndex == data.length ? "text-controls-light-inactive" : "cursor-pointer"
        }`}
        onClick={() => handlePrevNext("NEXT")}
      />
    </div>
  )
}
ChatPaginator.displayName = "ChatPaginator"
export default memo(ChatPaginator)
