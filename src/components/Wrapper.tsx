import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  wide?: boolean
}

function Wrapper({ children, wide = false }: WrapperProps) {
  const maxWidth = wide ? 'max-w-4xl' : 'max-w-[680px]'

  return (
    <div
      className={`relative mx-auto w-full ${maxWidth} rounded-2xl bg-white px-1 pb-10 pt-10 shadow-sm sm:px-10 sm:pt-16 animate-fade-in motion-reduce:animate-none`}
    >
      {children}
    </div>
  )
}

export default Wrapper
