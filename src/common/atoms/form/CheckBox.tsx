import React, { FC, memo } from "react"
//types
import { CHECKBOX } from "@/types"
const CheckBox: FC<CHECKBOX> = ({
  containerClassname = "",
  title,
  checked = false,
  onChange,
  id
}) => {
  return (
    <div className={`flex ${containerClassname} items-center gap-2`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-font-light-primary-link dark:accent-font-dark-primary-link"
        id={`check-${id}`}
      />
      <label
        className="text-font-light-primary dark:text-font-dark-primary text-p2-bold"
        htmlFor={`check-${id}`}>
        {title}
      </label>
    </div>
  )
}
export default memo(CheckBox)
