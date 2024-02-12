import { FC } from "react"
import { RadioGroup as RadioGroupHeadless } from "@headlessui/react"
import { IoCheckmarkSharp } from "react-icons/io5"
import { RADIO_GROUP } from "@/types"
const RadioGroup: FC<RADIO_GROUP> = ({ options, value = "", onChange = () => {} }) => {
  return (
    <RadioGroupHeadless value={value} onChange={onChange}>
      {/* <RadioGroupHeadless.Label className="sr-only">Server size</RadioGroupHeadless.Label> */}
      <div className="flex items-start gap-2">
        {options.map((plan) => (
          <RadioGroupHeadless.Option
            key={plan.label}
            value={plan.value}
            className={({ checked }) =>
              `${checked ? "!border-brand-light !dark:border-text-brand-dark" : ""}
                bg-transparent flex justify-center items-center cursor-pointer rounded-lg px-3 py-2.5 focus:outline-none border border-controls-light-inactive dark:border-controls-dark-inactive`
            }>
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between gap-1.5">
                  {checked && (
                    <IoCheckmarkSharp className="text-brand-light dark:text-brand-dark" size={20} />
                  )}
                  <div className="flex items-center">
                    <RadioGroupHeadless.Label
                      as="p"
                      className={`${
                        checked
                          ? "text-p2-medium text-brand-light dark:text-brand-dark"
                          : "text-p2-regular text-font-light-primary-3 dark:text-font-dark-primary-3"
                      }`}>
                      {plan.label}
                    </RadioGroupHeadless.Label>
                  </div>
                </div>
              </>
            )}
          </RadioGroupHeadless.Option>
        ))}
      </div>
    </RadioGroupHeadless>
  )
}
export default RadioGroup
