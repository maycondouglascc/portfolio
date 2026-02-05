import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  wide?: boolean
}

function Wrapper({ children, wide = false }: WrapperProps) {
  const maxWidth = wide ? 'max-w-4xl' : 'max-w-[680px]'

  return (
    <div
      className={`relative flex flex-col justify-between bg-white p-10 pt-16 ${maxWidth} rounded-2xl shadow-sm animate-fade-in motion-reduce:animate-none`}
    >
      {children}
    </div>
  )
}

export default Wrapper
