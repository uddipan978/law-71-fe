import { FC, useMemo, useState, memo } from "react"
import { useTheme } from "next-themes"
//types
import { INPUTBOX } from "@/types"
//constants
import colors from "@/common/constants/colors"
//utils
import { copyToClipboard } from "@/common/utils"
//icons
import {
  BsFillExclamationSquareFill,
  BsCheckSquareFill,
  BsEyeFill,
  BsEyeSlashFill,
  BsInfoSquareFill
} from "react-icons/bs"
import { MdLock } from "react-icons/md"
import { IoIosBackspace } from "react-icons/io"
import { PiCopyFill } from "react-icons/pi"

const InputBox: FC<INPUTBOX> = ({
  type = "text",
  name,
  id = "",
  className = "",
  placeholder = "",
  onChange = () => {},
  onClear = () => {},
  value = "",
  required = false,
  disabled = false,
  isError,
  isSuccess,
  helpText,
  label,
  inputWrapperClassName = "",
  showRightIcon = true,
  ...props
}) => {
  const { resolvedTheme } = useTheme()
  const [inputType, setInputType] = useState(type)
  const [isHovered, setHovered] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [isIconHovered, setIconHovered] = useState(false)

  const textColorClass = useMemo(() => {
    if (isError) {
      return `text-font-light-negative dark:text-font-dark-negative `
    } else {
      return `text-font-light-secondary dark:text-font-dark-secondary `
    }
  }, [isError])
  const borderColorClass = useMemo(() => {
    if (isFocused) {
      if (type === "textarea") {
        return ` border-brand-light dark:border-brand-dark`
      } else {
        return ` border-accent-light-active dark:border-accent-dark-active`
      }
    } else if (isError) {
      return ` text-accent-light-negative dark:text-accent-dark-negative`
    } else if (isHovered) {
      return ` border-controls-light-secondary-active dark:border-controls-dark-secondary-active`
    } else {
      return ` border-fill-light-stroke dark:border-fill-dark-stroke`
    }
  }, [isError, isHovered, isFocused, type])
  const eyeIconColor = useMemo(() => {
    if (resolvedTheme === "light") {
      if (isFocused || isIconHovered) {
        return colors.icons.light.secondary
      } else {
        return colors.icons.light.tertiary
      }
    } else if (resolvedTheme === "dark") {
      if (isFocused || isIconHovered) {
        return colors.icons.dark.secondary
      } else {
        return colors.icons.dark.tertiary
      }
    }
  }, [isFocused, isIconHovered, resolvedTheme])
  const getIconColor = (_theme: string, iconColorType: string) => {
    if (iconColorType === "secondary") {
      return _theme === "light" ? colors.icons.light.secondary : colors.icons.dark.secondary
    } else if (iconColorType === "negative") {
      return _theme === "light" ? colors.accent.light.negative : colors.accent.dark.negative
    } else if (iconColorType === "positive") {
      return _theme === "light" ? colors.accent.light.positive : colors.accent.dark.positive
    }
  }
  const togglePasswordShowHide = () => {
    setInputType(inputType === "password" ? "text" : "password")
  }
  return (
    <div className={`w-full flex-col justify-start items-start gap-1 inline-flex ${className}`}>
      {label && (
        <div className="flex">
          <p className={`${textColorClass} text-p2-regular`}>{label}</p>
          {disabled && <MdLock color={getIconColor(resolvedTheme ?? "light", "secondary")} />}
        </div>
      )}

      <div
        className={`w-full px-3 py-2.5 rounded-lg border ${borderColorClass} flex items-center ${inputWrapperClassName} ${
          disabled ? "bg-fill-light-disabled dark:bg-fill-dark-disabled" : ""
        }`}>
        {type === "textarea" ? (
          <textarea
            name={name}
            id={id}
            className={`w-full h-28 !outline-none !bg-transparent text-font-light-${
              disabled ? "secondary" : "primary"
            } dark:text-font-dark-${disabled ? "secondary" : "primary"}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            disabled={disabled}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}></textarea>
        ) : (
          <input
            type={inputType}
            name={name}
            id={id}
            className={`w-full !outline-none !bg-transparent text-font-light-${
              disabled ? "secondary" : "primary"
            } dark:text-font-dark-${disabled ? "secondary" : "primary"}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            disabled={disabled}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        )}
        {showRightIcon && (
          <>
            {(isFocused || isIconHovered) && value.length > 0 && type !== "password" ? (
              <IoIosBackspace
                color={getIconColor(resolvedTheme ?? "light", "secondary")}
                size={22}
                onClick={() => onClear()}
                className="cursor-pointer"
                onMouseEnter={() => setIconHovered(true)}
                onMouseLeave={() => setIconHovered(false)}
              />
            ) : isError ? (
              <BsFillExclamationSquareFill
                color={getIconColor(resolvedTheme ?? "light", "negative")}
              />
            ) : isSuccess ? (
              <BsCheckSquareFill color={getIconColor(resolvedTheme ?? "light", "positive")} />
            ) : disabled ? (
              value.length > 0 ? (
                <PiCopyFill
                  color={getIconColor(resolvedTheme ?? "light", "secondary")}
                  className="cursor-pointer"
                  size={20}
                  onClick={() => copyToClipboard(value)}
                />
              ) : (
                <BsInfoSquareFill color={getIconColor(resolvedTheme ?? "light", "secondary")} />
              )
            ) : type === "password" ? (
              inputType === "password" ? (
                <BsEyeFill
                  onClick={togglePasswordShowHide}
                  className="cursor-pointer"
                  color={eyeIconColor}
                  onMouseEnter={() => setIconHovered(true)}
                  onMouseLeave={() => setIconHovered(false)}
                  size={18}
                />
              ) : (
                <BsEyeSlashFill
                  onClick={togglePasswordShowHide}
                  className="cursor-pointer"
                  color={eyeIconColor}
                  onMouseEnter={() => setIconHovered(true)}
                  onMouseLeave={() => setIconHovered(false)}
                  size={18}
                />
              )
            ) : null}
          </>
        )}
      </div>
      {helpText && <div className={`${textColorClass} text-c1-regular`}>{helpText}</div>}
    </div>
  )
}
InputBox.displayName = "InputBox"
export default memo(InputBox)
