import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import {
  generateBaselineVisitorStats,
  type CityStat,
  type CountryStat,
  type DayActivity,
  type VisitorLocation,
  type VisitorStatsData,
} from "../data/visitorStats"
import { getVisitorStats } from "../services/visitorService"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

type ActiveTab = "activity" | "countries" | "cities"

export function VisitorHeatmap() {
  const { language, t } = useLanguage()
  const [statsData, setStatsData] = useState<VisitorStatsData>(() =>
    generateBaselineVisitorStats()
  )
  const [currentVisitor, setCurrentVisitor] = useState<VisitorLocation | null>(null)
  const [isDetecting, setIsDetecting] = useState(true)
  const [activeTab, setActiveTab] = useState<ActiveTab>("activity")
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [showAllCities, setShowAllCities] = useState(false)

  useEffect(() => {
    let isMounted = true

    getVisitorStats((loc) => {
      if (isMounted) {
        setCurrentVisitor(loc)
        setIsDetecting(false)
      }
    })
      .then((data) => {
        if (isMounted) {
          setStatsData(data)
          if (data.currentVisitor) {
            setCurrentVisitor(data.currentVisitor)
          }
          setIsDetecting(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsDetecting(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Month labels mapping for week columns, filtering out tight collisions
  const monthLabels = useMemo(() => {
    const monthStarts: { weekIndex: number; label: string }[] = []
    let lastMonth = ""

    statsData.weeks.forEach((week, weekIndex) => {
      const firstDay = week[0]
      if (!firstDay) return

      const date = new Date(firstDay.date + "T12:00:00")
      const monthStr = new Intl.DateTimeFormat(
        language === "pt" ? "pt-BR" : "en-US",
        { month: "short" }
      ).format(date)

      if (monthStr !== lastMonth) {
        monthStarts.push({ weekIndex, label: monthStr })
        lastMonth = monthStr
      }
    })

    // Filter out edge collisions (e.g. if a month has < 3 weeks at start or between labels)
    const totalWeeks = statsData.weeks.length || 24
    const filtered: { weekIndex: number; label: string }[] = []

    for (let i = 0; i < monthStarts.length; i++) {
      const current = monthStarts[i]
      const next = monthStarts[i + 1]

      // If the first month only has 1 or 2 weeks before the next month starts, skip it to prevent collision
      if (i === 0 && next && next.weekIndex < 3) {
        continue
      }

      // If too close to previously accepted label (< 3 weeks apart), skip it
      const prev = filtered[filtered.length - 1]
      if (prev && current.weekIndex - prev.weekIndex < 3) {
        continue
      }

      // If at the very end of the graph, skip to prevent overflow past right boundary
      if (current.weekIndex >= totalWeeks - 1) {
        continue
      }

      filtered.push(current)
    }

    return filtered
  }, [statsData.weeks, language])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00")
    return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      day: "numeric",
    }).format(d)
  }

  const getCellLevelClass = (level: DayActivity["level"]) => {
    switch (level) {
      case 0:
        return "bg-zinc-300/50 hover:ring-1 hover:ring-zinc-600 dark:bg-zinc-700/50 dark:hover:ring-zinc-300"
      case 1:
        return "bg-lime-500/25 hover:ring-1 hover:ring-lime-500 dark:bg-lime-400/20 dark:hover:ring-lime-400"
      case 2:
        return "bg-lime-500/50 hover:ring-1 hover:ring-lime-500 dark:bg-lime-400/45 dark:hover:ring-lime-400"
      case 3:
        return "bg-lime-500/75 hover:ring-1 hover:ring-lime-600 dark:bg-lime-400/70 dark:hover:ring-lime-300"
      case 4:
        return "bg-lime-600 hover:ring-1 hover:ring-lime-700 dark:bg-lime-400 dark:hover:ring-lime-200"
    }
  }

  // Country segment colors for GitHub-style distribution bar
  const getCountrySegmentBg = (index: number) => {
    switch (index) {
      case 0:
        return "bg-lime-600 dark:bg-lime-400"
      case 1:
        return "bg-lime-500/75 dark:bg-lime-400/75"
      case 2:
        return "bg-lime-500/45 dark:bg-lime-400/45"
      case 3:
        return "bg-zinc-500 dark:bg-zinc-400"
      case 4:
        return "bg-zinc-400 dark:bg-zinc-500"
      default:
        return "bg-zinc-300 dark:bg-zinc-600"
    }
  }

  const topCountriesList = showAllCountries
    ? statsData.topCountries
    : statsData.topCountries.slice(0, 6)

  const topCitiesList = showAllCities
    ? statsData.topCities
    : statsData.topCities.slice(0, 12)

  return (
    <section className="flex flex-col gap-4">
      {/* Header and live location pill */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
          {t("visitorStats.title")}
        </h2>

        {/* Live Visitor Indicator */}
        {currentVisitor ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-200/60 px-3 py-1 text-caption-12-regular text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500 dark:bg-lime-400" />
            </span>
            <span>
              {currentVisitor.flag}{" "}
              {t("visitorStats.currentLocation", {
                city: currentVisitor.city,
                country: currentVisitor.country,
              })}
            </span>
          </div>
        ) : isDetecting ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-200/40 px-3 py-1 text-caption-12-regular text-zinc-500 dark:bg-zinc-800/40 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400 motion-reduce:animate-none dark:bg-zinc-500" />
            <span>{t("visitorStats.detectingLocation")}</span>
          </div>
        ) : null}
      </div>

      {/* Main Container Card — matches CaseCard's rounded-2xl bg-zinc-200/40 */}
      <div className="flex flex-col overflow-hidden rounded-2xl bg-zinc-200/40 p-4 sm:p-6 dark:bg-zinc-800/40">
        {/* Metric Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300/40 pb-4 dark:border-zinc-700/40">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <div>
              <p className="text-caption-11-regular text-zinc-600 dark:text-zinc-400">
                {t("visitorStats.totalVisits")}
              </p>
              <p className="text-body-15-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.totalVisits.toLocaleString(
                  language === "pt" ? "pt-BR" : "en-US"
                )}
              </p>
            </div>
            <div className="h-6 w-px bg-zinc-300/60 dark:bg-zinc-700/60" />
            <div>
              <p className="text-caption-11-regular text-zinc-600 dark:text-zinc-400">
                {t("visitorStats.cities")}
              </p>
              <p className="text-body-15-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.citiesCount}
              </p>
            </div>
            <div className="h-6 w-px bg-zinc-300/60 dark:bg-zinc-700/60" />
            <div>
              <p className="text-caption-11-regular text-zinc-600 dark:text-zinc-400">
                {t("visitorStats.countries")}
              </p>
              <p className="text-body-15-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.countriesCount}
              </p>
            </div>
          </div>

          {/* View Tabs — matches ViewModeSelector pattern */}
          <div
            role="tablist"
            aria-label={t("visitorStats.title")}
            className="inline-flex items-center gap-0.5 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
              className={`rounded-md px-2.5 h-8 text-caption-12-regular font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100 ${
                activeTab === "activity"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("visitorStats.tabActivity")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "countries"}
              onClick={() => setActiveTab("countries")}
              className={`rounded-md px-2.5 h-8 text-caption-12-regular font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100 ${
                activeTab === "countries"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("visitorStats.tabCountries")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "cities"}
              onClick={() => setActiveTab("cities")}
              className={`rounded-md px-2.5 h-8 text-caption-12-regular font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100 ${
                activeTab === "cities"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("visitorStats.tabCities")}
            </button>
          </div>
        </div>

        {/* Tab 1: GitHub Contribution Heatmap */}
        {activeTab === "activity" && (
          <div className="pt-4">
            <TooltipProvider delayDuration={150}>
              <div className="w-full overflow-hidden">
                <div className="w-full">
                  {/* Month header row */}
                  <div className="mb-2 flex items-center gap-1.5 sm:gap-2.5 text-caption-11-regular text-zinc-600 dark:text-zinc-400">
                    {/* Spacer matching day labels column on the left */}
                    <div className="w-5 sm:w-6 shrink-0" aria-hidden="true" />

                    {/* Months track matching the exact width of week columns */}
                    <div className="relative h-4 flex-1 overflow-hidden">
                      {monthLabels.map(({ weekIndex, label }) => {
                        const leftPercent =
                          (weekIndex / (statsData.weeks.length || 24)) * 100
                        const clampedPercent = Math.min(leftPercent, 88)

                        return (
                          <span
                            key={`${weekIndex}-${label}`}
                            className="absolute capitalize select-none whitespace-nowrap"
                            style={{
                              left: `${clampedPercent}%`,
                            }}
                          >
                            {label}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Main Heatmap Grid */}
                  <div className="flex w-full items-stretch gap-1.5 sm:gap-2.5">
                    {/* Day of week labels on left (Mon, Wed, Fri) aligned 1:1 with rows 1, 3, 5 */}
                    <div className="flex w-5 sm:w-6 shrink-0 flex-col gap-[2px] sm:gap-1 text-caption-10-regular text-zinc-600 select-none dark:text-zinc-400">
                      <div className="flex-1" aria-hidden="true" />
                      <div className="flex flex-1 items-center justify-end">
                        <span className="leading-none pr-0.5 sm:pr-1">
                          {t("visitorStats.weekdays.mon")}
                        </span>
                      </div>
                      <div className="flex-1" aria-hidden="true" />
                      <div className="flex flex-1 items-center justify-end">
                        <span className="leading-none pr-0.5 sm:pr-1">
                          {t("visitorStats.weekdays.wed")}
                        </span>
                      </div>
                      <div className="flex-1" aria-hidden="true" />
                      <div className="flex flex-1 items-center justify-end">
                        <span className="leading-none pr-0.5 sm:pr-1">
                          {t("visitorStats.weekdays.fri")}
                        </span>
                      </div>
                      <div className="flex-1" aria-hidden="true" />
                    </div>

                    {/* Columns of 7 days filling the entire horizontal width */}
                    <div className="flex flex-1 min-w-0 gap-[2px] sm:gap-1">
                      {statsData.weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-1 min-w-0 flex-col gap-[2px] sm:gap-1">
                          {week.map((day) => {
                            const formattedDate = formatDate(day.date)
                            const tooltipTitle =
                              day.count === 0
                                ? t("visitorStats.tooltipEmpty", {
                                    date: formattedDate,
                                  })
                                : day.count === 1
                                ? t("visitorStats.tooltipSingular", {
                                    count: String(day.count),
                                    date: formattedDate,
                                  })
                                : t("visitorStats.tooltipPlural", {
                                    count: String(day.count),
                                    date: formattedDate,
                                  })

                            return (
                              <Tooltip key={day.date}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    aria-label={t("visitorStats.cellAriaLabel", {
                                      count: String(day.count),
                                      date: formattedDate,
                                    })}
                                    className={`relative aspect-square w-full rounded-[2px] transition-transform duration-75 hover:scale-125 hover:z-10 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 sm:rounded-[3px] dark:focus-visible:outline-zinc-100 ${getCellLevelClass(
                                      day.level
                                    )}`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="flex flex-col gap-1 text-left">
                                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {tooltipTitle}
                                  </span>
                                  {day.cities.length > 0 && (
                                    <span className="text-caption-11-regular text-zinc-600 dark:text-zinc-400">
                                      {t("visitorStats.tooltipCities", {
                                        cities: day.cities.join(", "),
                                      })}
                                    </span>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TooltipProvider>

            {/* Bottom row: Period note and Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-caption-12-regular text-zinc-600 dark:text-zinc-400">
              <span>{t("visitorStats.periodLabel")}</span>

              {/* GitHub Legend */}
              <div className="flex items-center gap-1.5">
                <span>{t("visitorStats.less")}</span>
                <span className="h-3 w-3 rounded-[2px] bg-zinc-300/50 dark:bg-zinc-700/50" />
                <span className="h-3 w-3 rounded-[2px] bg-lime-500/25 dark:bg-lime-400/20" />
                <span className="h-3 w-3 rounded-[2px] bg-lime-500/50 dark:bg-lime-400/45" />
                <span className="h-3 w-3 rounded-[2px] bg-lime-500/75 dark:bg-lime-400/70" />
                <span className="h-3 w-3 rounded-[2px] bg-lime-600 dark:bg-lime-400" />
                <span>{t("visitorStats.more")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Countries Breakdown (GitHub Language-bar style) */}
        {activeTab === "countries" && (
          <div className="flex flex-col gap-4 pt-4">
            {/* GitHub-style segmented distribution bar */}
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-300/50 dark:bg-zinc-700/50">
              {statsData.topCountries.slice(0, 6).map((country, index) => (
                <div
                  key={country.countryCode}
                  style={{ width: `${Math.max(country.percentage, 2)}%` }}
                  title={`${country.country}: ${country.percentage}%`}
                  className={`h-full transition-all duration-300 ${getCountrySegmentBg(
                    index
                  )}`}
                />
              ))}
            </div>

            {/* Countries list — clean rows matching ExperienceList */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {topCountriesList.map((c: CountryStat) => {
                const isVisitorCountry =
                  currentVisitor?.countryCode === c.countryCode

                return (
                  <div
                    key={c.countryCode}
                    className="flex items-center justify-between py-1 text-body-14-regular"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="select-none text-body-15-regular">{c.flag}</span>
                      <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                        {c.country}
                      </span>
                      {isVisitorCountry && (
                        <span className="rounded bg-lime-500/20 px-1.5 py-0.5 text-caption-10-medium font-medium text-lime-700 dark:text-lime-300">
                          {t("visitorStats.youIndicator")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 tabular-nums shrink-0 text-body-14-regular text-zinc-600 dark:text-zinc-400">
                      <span>{c.count}</span>
                      <span className="text-zinc-400 dark:text-zinc-500">({c.percentage}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {statsData.topCountries.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllCountries((prev) => !prev)}
                className="self-start text-caption-12-regular font-medium text-zinc-900 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:text-zinc-100 dark:focus-visible:outline-zinc-100"
              >
                {showAllCountries
                  ? t("visitorStats.showLess")
                  : `+ ${statsData.topCountries.length - 6} ${t("visitorStats.otherCountries")}`}
              </button>
            )}
          </div>
        )}

        {/* Tab 3: Cities Breakdown */}
        {activeTab === "cities" && (
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-wrap gap-2">
              {topCitiesList.map((city: CityStat) => {
                const isVisitorCity =
                  currentVisitor?.city.toLowerCase() ===
                  city.city.toLowerCase()

                return (
                  <div
                    key={`${city.city}-${city.countryCode}`}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-body-14-regular transition-colors ${
                      isVisitorCity
                        ? "bg-lime-500/20 font-medium text-zinc-900 dark:bg-lime-400/20 dark:text-zinc-100"
                        : "bg-zinc-300/40 text-zinc-800 dark:bg-zinc-700/40 dark:text-zinc-200"
                    }`}
                  >
                    <span className="select-none text-body-14-regular">{city.flag}</span>
                    <span>{city.city}</span>
                    <span className="text-caption-11-regular tabular-nums text-zinc-600 dark:text-zinc-400">
                      ({city.count})
                    </span>
                  </div>
                )
              })}
            </div>

            {statsData.topCities.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllCities((prev) => !prev)}
                className="self-start text-caption-12-regular font-medium text-zinc-900 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:text-zinc-100 dark:focus-visible:outline-zinc-100"
              >
                {showAllCities
                  ? t("visitorStats.showLess")
                  : `+ ${statsData.topCities.length - 12} ${t("visitorStats.cities")}`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default VisitorHeatmap
