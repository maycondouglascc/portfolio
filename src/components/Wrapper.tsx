import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

function Wrapper({ children }: WrapperProps) {
  return (
    <div
      className="relative mx-auto w-full animate-fade-in rounded-lg bg-white p-10 shadow-sm motion-reduce:animate-none dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-zinc-800"
    >
      {children}
    </div>
  )
}

export default Wrapper
