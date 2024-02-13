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