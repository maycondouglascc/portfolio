import {
  generateBaselineVisitorStats,
  getCountryFlag,
  type VisitorLocation,
  type VisitorStatsData,
} from "../data/visitorStats"

const SESSION_VISITOR_KEY = "md_visitor_location"
const LOCAL_STATS_CACHE = "md_visitor_stats_cache"

/**
 * Maps common timezones to a friendly city and country fallback
 */
function inferLocationFromTimezone(): VisitorLocation {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    if (tz.includes("Sao_Paulo") || tz.includes("Belem") || tz.includes("Fortaleza") || tz.includes("Recife") || tz.includes("Cuiaba") || tz.includes("Manaus")) {
      return {
        city: "São Paulo",
        country: "Brasil",
        countryCode: "BR",
        flag: getCountryFlag("BR"),
      }
    }
    if (tz.includes("New_York") || tz.includes("Detroit")) {
      return {
        city: "Nova York",
        country: "United States",
        countryCode: "US",
        flag: getCountryFlag("US"),
      }
    }
    if (tz.includes("Los_Angeles") || tz.includes("San_Francisco")) {
      return {
        city: "San Francisco",
        country: "United States",
        countryCode: "US",
        flag: getCountryFlag("US"),
      }
    }
    if (tz.includes("Lisbon")) {
      return {
        city: "Lisboa",
        country: "Portugal",
        countryCode: "PT",
        flag: getCountryFlag("PT"),
      }
    }
    if (tz.includes("London")) {
      return {
        city: "Londres",
        country: "Reino Unido",
        countryCode: "GB",
        flag: getCountryFlag("GB"),
      }
    }
    if (tz.includes("Berlin")) {
      return {
        city: "Berlim",
        country: "Alemanha",
        countryCode: "DE",
        flag: getCountryFlag("DE"),
      }
    }
  } catch {
    // ignore
  }

  return {
    city: "São Paulo",
    country: "Brasil",
    countryCode: "BR",
    flag: getCountryFlag("BR"),
  }
}

/**
 * Attempts to detect visitor geolocation using multiple resilient tiers:
 * 1. Session storage cache (instant)
 * 2. /api/visitors serverless endpoint (Vercel IP headers)
 * 3. Free IP geolocation services (ipapi.co, freeipapi.com)
 * 4. Browser Intl timezone heuristic fallback
 */
export async function detectVisitorLocation(): Promise<VisitorLocation> {
  if (typeof window === "undefined") {
    return inferLocationFromTimezone()
  }

  // 1. Session cache
  try {
    const cached = window.sessionStorage.getItem(SESSION_VISITOR_KEY)
    if (cached) {
      const parsed = JSON.parse(cached) as VisitorLocation
      if (parsed.city && parsed.countryCode) return parsed
    }
  } catch {
    // continue
  }

  // 2. Try portfolio /api/visitors endpoint
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2500)
    const res = await fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (res.ok) {
      const data = await res.json()
      if (data?.visitor?.city && data?.visitor?.countryCode) {
        const loc: VisitorLocation = {
          city: data.visitor.city,
          country: data.visitor.country || data.visitor.city,
          countryCode: data.visitor.countryCode,
          region: data.visitor.region,
          flag: getCountryFlag(data.visitor.countryCode),
        }
        window.sessionStorage.setItem(SESSION_VISITOR_KEY, JSON.stringify(loc))
        return loc
      }
    }
  } catch {
    // fallback to external IP service
  }

  // 3. Fallback to free public IP lookup service with timeout
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal })
    clearTimeout(timeout)
    if (res.ok) {
      const data = await res.json()
      if (data?.city && data?.country_code) {
        const loc: VisitorLocation = {
          city: data.city,
          country: data.country_name || data.city,
          countryCode: data.country_code,
          region: data.region_code,
          flag: getCountryFlag(data.country_code),
        }
        window.sessionStorage.setItem(SESSION_VISITOR_KEY, JSON.stringify(loc))
        return loc
      }
    }
  } catch {
    // continue to secondary fallback
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)
    const res = await fetch("https://freeipapi.com/api/json", { signal: controller.signal })
    clearTimeout(timeout)
    if (res.ok) {
      const data = await res.json()
      if (data?.cityName && data?.countryCode) {
        const loc: VisitorLocation = {
          city: data.cityName,
          country: data.countryName || data.cityName,
          countryCode: data.countryCode,
          flag: getCountryFlag(data.countryCode),
        }
        window.sessionStorage.setItem(SESSION_VISITOR_KEY, JSON.stringify(loc))
        return loc
      }
    }
  } catch {
    // continue to heuristic
  }

  // 4. Timezone heuristic fallback
  const inferred = inferLocationFromTimezone()
  try {
    window.sessionStorage.setItem(SESSION_VISITOR_KEY, JSON.stringify(inferred))
  } catch {
    // ignore
  }
  return inferred
}

/**
 * Loads visitor stats data with detected location incorporated
 */
export async function getVisitorStats(
  onVisitorDetected?: (loc: VisitorLocation) => void
): Promise<VisitorStatsData> {
  // First, check local storage for baseline
  let cachedData: VisitorStatsData | null = null
  try {
    const raw = window.localStorage.getItem(LOCAL_STATS_CACHE)
    if (raw) {
      cachedData = JSON.parse(raw) as VisitorStatsData
    }
  } catch {
    // ignore
  }

  // Detect current visitor asynchronously
  const visitor = await detectVisitorLocation()
  if (onVisitorDetected) {
    onVisitorDetected(visitor)
  }

  const updatedStats = generateBaselineVisitorStats(visitor)
  try {
    window.localStorage.setItem(LOCAL_STATS_CACHE, JSON.stringify(updatedStats))
  } catch {
    // ignore
  }

  return updatedStats
}
