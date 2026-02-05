import { useEffect, useState } from "react"

export function LocalTime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(now)
      setTime(`⏲ ${formatted}`)
    }

    update()
    const interval = window.setInterval(update, 60000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className="text-body-14-regular font-normal text-secondary tabular-nums">
      {time}
    </span>
  )
}
