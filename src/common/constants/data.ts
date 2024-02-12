//images
//themes
import darkThemeIcon from "@/assets/images/icons/dark-theme.svg"
import lightThemeIcon from "@/assets/images/icons/light-theme.svg"
import systemThemeIcon from "@/assets/images/icons/system-theme.svg"

export const THEME_OPTIONS = [
  {
    name: "Always light",
    value: "light",
    icon: lightThemeIcon
  },
  {
    name: "Always dark",
    value: "dark",
    icon: darkThemeIcon
  },
  {
    name: "System settings",
    value: "system",
    icon: systemThemeIcon
  }
]
export const POSITIVE_FEEDBACK_OPTIONS = [
  {
    label: "Correct",
    value: "correct"
  },
  {
    label: "Easy to understand",
    value: "easy-to-understand"
  },
  {
    label: "Complete",
    value: "complete"
  }
]
export const NEGATIVE_FEEDBACK_OPTIONS = [
  {
    label: "Harmful/Unsafe",
    value: "harmful"
  },
  {
    label: "Inaccurate",
    value: "inaccurate"
  },
  {
    label: "Unhelpful",
    value: "unhelpful"
  }
]
export const EMPTY_OPTION = [
  {
    label: "No Option Found",
    value: "",
    disabled: true
  }
]