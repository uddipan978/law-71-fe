import { FC, useMemo, memo } from "react"
import { useTheme } from "next-themes"

// components
import Spinner from "../Spinner"

// types
import { BUTTON } from "@/types"

// constants
import { SPINNER_APPEARANCE } from "@/common/constants/enums"

const Button: FC<BUTTON> = ({
  type = "button",
  className = "",
  iconClassName = "",
  disabled = false,
  label = "Send",
  onClick = () => {},
  isLoading = false,
  appearance = "primary",
  size = "md",
  icon: Icon = null,
  iconDirection = "start",
  labelClassName = ""
}) => {
  const { resolvedTheme } = useTheme()
  const spinnerAppearance = useMemo(() => {
    let _spinnerAppearance = SPINNER_APPEARANCE.dark
    if (appearance === "primary") {
      _spinnerAppearance = SPINNER_APPEARANCE.light
    } else if (appearance === "white") {
      _spinnerAppearance = SPINNER_APPEARANCE.dark
    } else if (appearance === "secondary" || appearance === "ghost") {
      _spinnerAppearance =
        resolvedTheme === "light" ? SPINNER_APPEARANCE.dark : SPINNER_APPEARANCE.light
    } else if (appearance === "negative") {
      _spinnerAppearance = SPINNER_APPEARANCE.danger
    }
    return _spinnerAppearance
  }, [appearance, resolvedTheme])
  const buttonClasses = useMemo(() => {
    let allClasses = `w-full justify-center items-center inline-flex disabled:bg-controls-light-inactive dark:disabled:bg-controls-dark-inactive`
    if (size === "md") {
      allClasses += ` rounded-md h-8 px-2 py-1.5`
    } else if (size === "lg") {
      allClasses += ` rounded-lg h-11 p-2.5`
    }
    if (appearance === "primary") {
      if (isLoading) {
        allClasses += ` bg-brand-light dark:bg-brand-dark`
      } else {
        allClasses += ` bg-controls-light-primary-active dark:bg-controls-dark-primary-active`
      }
    } else if (appearance === "primary-outline") {
      allClasses += ` border border-brand-light dark:border-brand-dark`
    } else if (appearance === "white") {
      allClasses += ` bg-white`
    } else if (appearance === "secondary" || appearance === "negative") {
      allClasses += ` bg-controls-light-tertiary-active dark:bg-controls-dark-tertiary-active`
    } else if (appearance === "ghost") {
      allClasses += ` bg-transparent`
    }
    if (className.length) {
      allClasses += ` ${className}`
    }
    return allClasses
  }, [size, appearance, className, isLoading])
  const labelClasses = useMemo(() => {
    let _class = ""
    if (size === "lg") {
      _class += "text-p1-medium"
    } else if (size === "md") {
      _class += "text-p2-medium"
    }
    if (disabled) {
      _class += " text-font-light-tertiary dark:text-font-dark-tertiary"
    } else {
      if (appearance === "primary") {
        _class += " text-white"
      } else if (appearance === "primary-outline") {
        _class += " text-brand-light dark:text-brand-dark"
      } else if (appearance === "white") {
        _class += " text-black"
      } else if (appearance === "secondary" || appearance === "ghost") {
        _class += " text-font-light-primary dark:text-font-dark-primary"
      } else if (appearance === "negative") {
        _class += " text-font-light-negative dark:text-font-dark-negative"
      }
    }
    if (labelClassName.length) {
      _class += ` ${labelClassName}`
    }
    return _class
  }, [appearance, size, disabled, labelClassName])

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={(e) => (!isLoading ? onClick(e) : null)}
      aria-label={label}>
      {isLoading ? (
        <Spinner size={size === "md" ? "sm" : "md"} appearance={spinnerAppearance} />
      ) : (
        <>
          {iconDirection === "start" && Icon && (
            <Icon
              className={`${iconClassName} ${label.length > 0 ? "mr-2" : ""}`}
              size={size === "md" ? 20 : 23}
            />
          )}
          {label.length > 0 && <p className={labelClasses}>{label}</p>}
          {iconDirection === "end" && Icon && (
            <Icon
              className={iconClassName}
              style={{ marginLeft: 8 }}
              size={size === "md" ? 20 : 23}
            />
          )}
        </>
      )}
    </button>
  )
}
Button.displayName = "Button"
export default memo(Button)
