import { FC, useMemo, memo } from "react"
import Image from "next/image"
//icons
import SpinnerDark from "@/assets/images/spinners/spinner-dark.svg"
import SpinnerLight from "@/assets/images/spinners/spinner-light.svg"
import SpinnerSuccess from "@/assets/images/spinners/spinner-success.svg"
import SpinnerDanger from "@/assets/images/spinners/spinner-danger.svg"
//types
import { SPINNER } from "@/types"
//constants
import { SPINNER_APPEARANCE } from "../constants/enums"
const Spinner: FC<SPINNER> = ({ size = "md", appearance = SPINNER_APPEARANCE.dark }) => {
  const SpinnerSvg = useMemo(() => {
    if (appearance === SPINNER_APPEARANCE.dark) {
      return SpinnerDark
    } else if (appearance === SPINNER_APPEARANCE.light) {
      return SpinnerLight
    } else if (appearance === SPINNER_APPEARANCE.success) {
      return SpinnerSuccess
    } else if (appearance === SPINNER_APPEARANCE.danger) {
      return SpinnerDanger
    }
  }, [appearance])
  const SpinnerSize = useMemo(() => {
    if (size === "sm") {
      return 16
    } else if (size === "md") {
      return 24
    } else if (size === "lg") {
      return 44
    }
  }, [size])
  return (
    <Image
      src={SpinnerSvg}
      alt="Spinner"
      width={SpinnerSize}
      height={SpinnerSize}
      className="animate-spin"
    />
  )
}
Spinner.displayName = "Spinner"
export default memo(Spinner)
