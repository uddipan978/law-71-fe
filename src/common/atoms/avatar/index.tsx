import { FC } from "react"
import Image from "next/image"

const Avatar: FC<{ text?: string; imageUrl?: string }> = ({ text, imageUrl }) => {
  return (
    <div className="relative">
      {text ? (
        <div className="p-4 rounded-full bg-font-light-primary-link">
          <span className="text-white text-md font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {text}
          </span>
        </div>
      ) : imageUrl ? (
        <Image src={imageUrl} className="rounded-full" width={30} height={30} alt="Avatar" />
      ) : null}
    </div>
  )
}

export default Avatar
