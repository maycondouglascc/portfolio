import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  wide?: boolean
}

function Wrapper({ children, wide = false }: WrapperProps) {
  const maxWidth = wide ? 'max-w-4xl' : 'max-w-[680px]'

  return (
    <div
      className={`relative mx-auto w-full ${maxWidth} animate-fade-in rounded-2xl bg-white px-3 pb-3 pt-3 shadow-sm motion-reduce:animate-none dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-zinc-800 sm:px-10 sm:pb-10 sm:pt-16`}
    >
      {children}
    </div>
  )
}

export default Wrapper
