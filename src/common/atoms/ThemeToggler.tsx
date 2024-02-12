import { FC, memo, Fragment, useMemo } from "react"
import { Popover, Transition } from "@headlessui/react"
import { useTheme } from "next-themes"
import Image from "next/image"

// Constants
import { THEME_OPTIONS } from "../constants/data"
import colors from "../constants/colors"

// Icons
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const ThemeToggler: FC = () => {
  const { resolvedTheme, theme, setTheme } = useTheme()
  const selectedTheme = useMemo(
    () => THEME_OPTIONS.filter((_theme) => _theme.value === theme)[0],
    [theme]
  )

  const iconColor = useMemo(
    () => (resolvedTheme === "light" ? colors.icons.light.secondary : colors.icons.dark.secondary),
    [resolvedTheme]
  )

  return (
    <Popover className="relative">
      {({ open }) => (
        <Fragment>
          <Popover.Button
            className={`hover:text-white focus:outline-none px-3 px-1 flex justify-center items-center gap-2`}>
            <Image src={selectedTheme?.icon} alt={selectedTheme?.value} width={26} height={26} />
            <div className="flex items-center gap-3">
              <p className="text-p2-regular text-font-light-secondary dark:text-font-dark-secondary">
                {selectedTheme?.name}
              </p>
              {open ? (
                <FaChevronUp size={16} color={iconColor} />
              ) : (
                <FaChevronDown size={16} color={iconColor} />
              )}
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className={"absolute z-10 mt-3 bottom-10 left-0"}>
              <div className="w-44 py-2 bg-fill-light-modal dark:bg-fill-dark-modal rounded-lg shadow flex-col justify-start items-start inline-flex">
                {THEME_OPTIONS.map((item) => (
                  <div
                    className="self-stretch flex-col justify-center items-start flex hover:bg-fill-light-secondary hover:dark:bg-fill-dark-secondary cursor-pointer"
                    key={item.name}
                    onClick={() => setTheme(item.value)}>
                    <div className="pl-3 py-2 justify-start items-center gap-2 inline-flex">
                      <Image src={item.icon} alt={item.value} width={24} height={24} />
                      <div className="flex-col justify-center items-start inline-flex">
                        <p className="text-p2-regular text-font-light-primary dark:text-font-dark-primary">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  )
}

ThemeToggler.displayName = "ThemeToggler"

export default memo(ThemeToggler)
