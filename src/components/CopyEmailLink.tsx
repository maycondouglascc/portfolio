import { useEffect, useRef, useState } from "react"
import Button from "./Button"

type CopyEmailLinkProps = {
  email: string
  label?: string
}

export function CopyEmailLink({ email, label = "Email" }: CopyEmailLinkProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
    }
  }

  return (
    <span className="relative inline-flex items-center">
      <Button
        onClick={handleCopy}
        aria-label={`Copiar ${email}`}
        variant="link"
      >
        {label}
      </Button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-caption-14-regular font-normal text-primary shadow-md transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        } motion-reduce:transition-none`}
      >
        Email copiado!
      </span>
    </span>
  )
}
