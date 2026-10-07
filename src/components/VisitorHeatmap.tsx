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

  // Month labels mapping for week columns
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = []
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
        labels.push({ index: weekIndex, label: monthStr })
        lastMonth = monthStr
      }
    })

    return labels
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
        return "bg-zinc-100 hover:ring-1 hover:ring-zinc-400 dark:bg-zinc-800/80 dark:hover:ring-zinc-600"
      case 1:
        return "bg-accent/25 hover:ring-1 hover:ring-accent"
      case 2:
        return "bg-accent/50 hover:ring-1 hover:ring-accent"
      case 3:
        return "bg-accent/75 hover:ring-1 hover:ring-accent"
      case 4:
        return "bg-accent hover:ring-1 hover:ring-accent"
    }
  }

  // Country segment colors for GitHub-style distribution bar
  const getCountrySegmentBg = (index: number) => {
    switch (index) {
      case 0:
        return "bg-accent"
      case 1:
        return "bg-accent/70"
      case 2:
        return "bg-accent/45"
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
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-caption-12-regular text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
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
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/60 bg-zinc-50/50 px-3 py-1 text-caption-12-regular text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-800/30 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400 dark:bg-zinc-500" />
            <span>{t("visitorStats.detectingLocation")}</span>
          </div>
        ) : null}
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-none">
        {/* Metric Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <div>
              <p className="text-caption-11-regular text-zinc-500 dark:text-zinc-400">
                {t("visitorStats.totalVisits")}
              </p>
              <p className="text-body-16-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.totalVisits.toLocaleString(
                  language === "pt" ? "pt-BR" : "en-US"
                )}
              </p>
            </div>
            <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <p className="text-caption-11-regular text-zinc-500 dark:text-zinc-400">
                {t("visitorStats.cities")}
              </p>
              <p className="text-body-16-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.citiesCount}
              </p>
            </div>
            <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <p className="text-caption-11-regular text-zinc-500 dark:text-zinc-400">
                {t("visitorStats.countries")}
              </p>
              <p className="text-body-16-medium font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
                {statsData.countriesCount}
              </p>
            </div>
          </div>

          {/* View Tabs */}
          <div
            role="tablist"
            aria-label={t("visitorStats.title")}
            className="inline-flex items-center gap-0.5 rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
              className={`rounded-md px-2.5 py-1 text-caption-12-regular font-medium transition-colors duration-150 ${
                activeTab === "activity"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100"
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
              className={`rounded-md px-2.5 py-1 text-caption-12-regular font-medium transition-colors duration-150 ${
                activeTab === "countries"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100"
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
              className={`rounded-md px-2.5 py-1 text-caption-12-regular font-medium transition-colors duration-150 ${
                activeTab === "cities"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100"
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
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="min-w-[430px]">
                  {/* Month header row */}
                  <div className="mb-2 flex pl-7 text-caption-11-regular text-zinc-500 dark:text-zinc-400">
                    <div className="relative h-4 w-full">
                      {monthLabels.map(({ index, label }) => (
                        <span
                          key={`${index}-${label}`}
                          className="absolute capitalize"
                          style={{ left: `${index * 17}px` }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Main Heatmap Grid */}
                  <div className="flex gap-2">
                    {/* Day of week labels on left (Mon, Wed, Fri) */}
                    <div className="flex flex-col justify-between pt-0.5 text-caption-10-regular text-zinc-500 dark:text-zinc-400 h-[106px] w-5 select-none">
                      <span className="leading-none">
                        {t("visitorStats.weekdays.mon")}
                      </span>
                      <span className="leading-none">
                        {t("visitorStats.weekdays.wed")}
                      </span>
                      <span className="leading-none">
                        {t("visitorStats.weekdays.fri")}
                      </span>
                    </div>

                    {/* Columns of 7 days */}
                    <div className="flex gap-[3.5px]">
                      {statsData.weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-[3.5px]">
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
                                    className={`h-3 w-3 rounded-[2.5px] transition-transform duration-100 hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 sm:h-3.5 sm:w-3.5 dark:focus-visible:outline-zinc-100 ${getCellLevelClass(
                                      day.level
                                    )}`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="flex flex-col gap-1 text-left">
                                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {tooltipTitle}
                                  </span>
                                  {day.cities.length > 0 && (
                                    <span className="text-caption-11-regular text-zinc-500 dark:text-zinc-400">
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-caption-12-regular text-zinc-500 dark:text-zinc-400">
              <span>{t("visitorStats.periodLabel")}</span>

              {/* GitHub Legend */}
              <div className="flex items-center gap-1.5">
                <span>{t("visitorStats.less")}</span>
                <span className="h-3 w-3 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/80" />
                <span className="h-3 w-3 rounded-[2px] bg-accent/25" />
                <span className="h-3 w-3 rounded-[2px] bg-accent/50" />
                <span className="h-3 w-3 rounded-[2px] bg-accent/75" />
                <span className="h-3 w-3 rounded-[2px] bg-accent" />
                <span>{t("visitorStats.more")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Countries Breakdown (GitHub Language-bar style) */}
        {activeTab === "countries" && (
          <div className="flex flex-col gap-4 pt-4">
            {/* GitHub-style segmented distribution bar */}
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
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

            {/* Countries list */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {topCountriesList.map((c: CountryStat, idx: number) => {
                const isVisitorCountry =
                  currentVisitor?.countryCode === c.countryCode

                return (
                  <div
                    key={c.countryCode}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-body-14-regular transition-colors ${
                      isVisitorCountry
                        ? "border-accent/40 bg-accent/5 dark:border-accent/30 dark:bg-accent/10"
                        : "border-zinc-100 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-800/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base select-none">{c.flag}</span>
                      <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                        {c.country}
                      </span>
                      {isVisitorCountry && (
                        <span className="rounded bg-accent/15 px-1.5 py-0.5 text-caption-10-medium font-medium text-accent">
                          {t("visitorStats.tabCities") ? "•" : ""}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 tabular-nums shrink-0 text-caption-12-regular text-zinc-600 dark:text-zinc-400">
                      <span>{c.count}</span>
                      <span className="text-zinc-400 dark:text-zinc-600">({c.percentage}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {statsData.topCountries.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllCountries((prev) => !prev)}
                className="self-start text-caption-12-regular font-medium text-accent hover:underline focus-visible:outline-none"
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
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-body-14-regular transition-colors ${
                      isVisitorCity
                        ? "border-accent/40 bg-accent/10 font-medium text-zinc-900 dark:text-zinc-100"
                        : "border-zinc-100 bg-zinc-50/70 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-200"
                    }`}
                  >
                    <span className="text-sm select-none">{city.flag}</span>
                    <span>{city.city}</span>
                    <span className="text-caption-11-regular tabular-nums text-zinc-500 dark:text-zinc-400">
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
                className="self-start text-caption-12-regular font-medium text-accent hover:underline focus-visible:outline-none"
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
