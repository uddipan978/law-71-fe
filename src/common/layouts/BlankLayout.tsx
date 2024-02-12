import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
//components
// import ThemeToggler from "@/common/atoms/ThemeToggler"
const BlankLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <div className='bg-fill-light-secondary dark:bg-fill-dark-secondary'>
        <Link className='flex items-center py-4 md:mb-0 justify-center' href={"/"}>
          <Image src='/logo.png' alt='Logo' width={175} height={42} />
        </Link>
        <div className='flex'>
          <div className='h-[calc(100vh-80px)] flex-1 overflow-x-hidden overflow-y-auto px-4 py-4'>
            <div className='bg-fill-light-primary-elevated dark:bg-fill-dark-primary-elevated rounded-[32px] h-full backdrop-blur-md'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default BlankLayout
