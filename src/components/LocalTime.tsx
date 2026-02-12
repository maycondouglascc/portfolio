import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export function LocalTime() {
  const [time, setTime] = useState("")
  const { language, t } = useLanguage()

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(now)
      setTime(`${t("localTime.prefix")}: ${formatted}`)
    }

    update()
    const interval = window.setInterval(update, 60000)
    return () => window.clearInterval(interval)
  }, [language, t])

  return (
    <span className="text-body-14-regular font-normal text-zinc-600 tabular-nums dark:text-zinc-400">
      {time}
    </span>
  )
}
