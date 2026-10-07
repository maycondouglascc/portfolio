export interface VisitorLocation {
  city: string
  country: string
  countryCode: string
  region?: string
  flag: string
}

export interface CountryStat {
  country: string
  countryCode: string
  count: number
  percentage: number
  citiesCount: number
  flag: string
}

export interface CityStat {
  city: string
  country: string
  countryCode: string
  count: number
  flag: string
}

export interface DayActivity {
  date: string // YYYY-MM-DD
  count: number
  level: 0 | 1 | 2 | 3 | 4
  cities: string[]
}

export interface VisitorStatsData {
  totalVisits: number
  countriesCount: number
  citiesCount: number
  topCountries: CountryStat[]
  topCities: CityStat[]
  weeks: DayActivity[][]
  currentVisitor: VisitorLocation | null
}

export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐"
  const upper = countryCode.toUpperCase()
  const offset = 127397
  return String.fromCodePoint(
    upper.charCodeAt(0) + offset,
    upper.charCodeAt(1) + offset
  )
}

interface BaseLocationSeed {
  city: string
  country: string
  countryCode: string
  weight: number
}

const SEED_LOCATIONS: BaseLocationSeed[] = [
  { city: "São Paulo", country: "Brasil", countryCode: "BR", weight: 28 },
  { city: "Belo Horizonte", country: "Brasil", countryCode: "BR", weight: 22 },
  { city: "Rio de Janeiro", country: "Brasil", countryCode: "BR", weight: 14 },
  { city: "San Francisco", country: "United States", countryCode: "US", weight: 12 },
  { city: "Nova York", country: "United States", countryCode: "US", weight: 10 },
  { city: "Lisboa", country: "Portugal", countryCode: "PT", weight: 9 },
  { city: "Curitiba", country: "Brasil", countryCode: "BR", weight: 8 },
  { city: "Berlim", country: "Alemanha", countryCode: "DE", weight: 7 },
  { city: "Londres", country: "Reino Unido", countryCode: "GB", weight: 7 },
  { city: "Porto", country: "Portugal", countryCode: "PT", weight: 6 },
  { city: "Florianópolis", country: "Brasil", countryCode: "BR", weight: 6 },
  { city: "Seattle", country: "United States", countryCode: "US", weight: 5 },
  { city: "Toronto", country: "Canadá", countryCode: "CA", weight: 5 },
  { city: "Amsterdã", country: "Holanda", countryCode: "NL", weight: 5 },
  { city: "Austin", country: "United States", countryCode: "US", weight: 4 },
  { city: "Brasília", country: "Brasil", countryCode: "BR", weight: 4 },
  { city: "Dublin", country: "Irlanda", countryCode: "IE", weight: 4 },
  { city: "Madri", country: "Espanha", countryCode: "ES", weight: 3 },
  { city: "Paris", country: "França", countryCode: "FR", weight: 3 },
  { city: "Tóquio", country: "Japão", countryCode: "JP", weight: 2 },
  { city: "Buenos Aires", country: "Argentina", countryCode: "AR", weight: 2 },
  { city: "Sydney", country: "Austrália", countryCode: "AU", weight: 2 },
]

function getIntensityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 11) return 3
  return 4
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * Generates 24 weeks of contribution calendar activity up to the current week.
 */
export function generateBaselineVisitorStats(
  currentVisitorOverride?: VisitorLocation | null
): VisitorStatsData {
  const today = new Date()
  const currentDayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday

  // We want 24 weeks (168 days) ending on the current week's Saturday
  const daysToEndOfWeek = 6 - currentDayOfWeek
  const endDate = new Date(today)
  endDate.setDate(today.getDate() + daysToEndOfWeek)

  const totalDays = 24 * 7 // 168 days
  const startDate = new Date(endDate)
  startDate.setDate(endDate.getDate() - totalDays + 1)

  const weeks: DayActivity[][] = []
  const cityCounts = new Map<string, { city: string; country: string; countryCode: string; count: number }>()
  const countryCounts = new Map<string, { country: string; countryCode: string; count: number; cities: Set<string> }>()
  let totalVisits = 0

  for (const loc of SEED_LOCATIONS) {
    cityCounts.set(`${loc.city}-${loc.countryCode}`, {
      city: loc.city,
      country: loc.country,
      countryCode: loc.countryCode,
      count: 0,
    })
    if (!countryCounts.has(loc.countryCode)) {
      countryCounts.set(loc.countryCode, {
        country: loc.country,
        countryCode: loc.countryCode,
        count: 0,
        cities: new Set(),
      })
    }
    countryCounts.get(loc.countryCode)!.cities.add(loc.city)
  }

  let currentWeek: DayActivity[] = []
  const iterDate = new Date(startDate)

  for (let i = 0; i < totalDays; i++) {
    const isFuture = iterDate > today
    const dateStr = formatDateISO(iterDate)
    const dayOfWeek = iterDate.getDay()

    let count = 0
    const dayCities: string[] = []

    if (!isFuture) {
      // Deterministic simulation based on date string hash
      const hash = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const rand = pseudoRandom(hash)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      // Weekdays get more visits than weekends
      const baseProb = isWeekend ? 0.65 : 0.92
      if (rand < baseProb) {
        const magnitude = isWeekend ? Math.floor(rand * 6) + 1 : Math.floor(rand * 14) + 2
        count = magnitude
      }

      // If today, guarantee at least 4 visits (including current visitor)
      if (dateStr === formatDateISO(today)) {
        count = Math.max(count, 5)
      }

      totalVisits += count

      // Pick top cities for that day
      if (count > 0) {
        const cityPoolIndex = hash % SEED_LOCATIONS.length
        const picked1 = SEED_LOCATIONS[cityPoolIndex]
        const picked2 = SEED_LOCATIONS[(cityPoolIndex + 3) % SEED_LOCATIONS.length]
        dayCities.push(picked1.city)
        if (count > 4) {
          dayCities.push(picked2.city)
        }

        // Increment city tally
        const cEntry1 = cityCounts.get(`${picked1.city}-${picked1.countryCode}`)
        if (cEntry1) cEntry1.count += Math.ceil(count * 0.6)

        const countryEntry1 = countryCounts.get(picked1.countryCode)
        if (countryEntry1) countryEntry1.count += Math.ceil(count * 0.6)

        if (dayCities.length > 1) {
          const cEntry2 = cityCounts.get(`${picked2.city}-${picked2.countryCode}`)
          if (cEntry2) cEntry2.count += Math.floor(count * 0.4)

          const countryEntry2 = countryCounts.get(picked2.countryCode)
          if (countryEntry2) countryEntry2.count += Math.floor(count * 0.4)
        }
      }
    }

    currentWeek.push({
      date: dateStr,
      count,
      level: getIntensityLevel(count),
      cities: dayCities,
    })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    iterDate.setDate(iterDate.getDate() + 1)
  }

  // If a current visitor is passed, add/increment their location
  if (currentVisitorOverride) {
    const key = `${currentVisitorOverride.city}-${currentVisitorOverride.countryCode}`
    if (cityCounts.has(key)) {
      cityCounts.get(key)!.count += 1
    } else {
      cityCounts.set(key, {
        city: currentVisitorOverride.city,
        country: currentVisitorOverride.country,
        countryCode: currentVisitorOverride.countryCode,
        count: 1,
      })
    }

    if (countryCounts.has(currentVisitorOverride.countryCode)) {
      const c = countryCounts.get(currentVisitorOverride.countryCode)!
      c.count += 1
      c.cities.add(currentVisitorOverride.city)
    } else {
      countryCounts.set(currentVisitorOverride.countryCode, {
        country: currentVisitorOverride.country,
        countryCode: currentVisitorOverride.countryCode,
        count: 1,
        cities: new Set([currentVisitorOverride.city]),
      })
    }

    totalVisits += 1

    // Add to today's entry
    const todayStr = formatDateISO(today)
    for (const week of weeks) {
      for (const day of week) {
        if (day.date === todayStr) {
          day.count += 1
          day.level = getIntensityLevel(day.count)
          if (!day.cities.includes(currentVisitorOverride.city)) {
            day.cities.unshift(currentVisitorOverride.city)
          }
        }
      }
    }
  }

  // Format Top Countries
  const topCountries: CountryStat[] = Array.from(countryCounts.values())
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .map((c) => ({
      country: c.country,
      countryCode: c.countryCode,
      count: c.count,
      percentage: totalVisits > 0 ? Math.round((c.count / totalVisits) * 100) : 0,
      citiesCount: c.cities.size,
      flag: getCountryFlag(c.countryCode),
    }))

  // Format Top Cities
  const topCities: CityStat[] = Array.from(cityCounts.values())
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .map((c) => ({
      city: c.city,
      country: c.country,
      countryCode: c.countryCode,
      count: c.count,
      flag: getCountryFlag(c.countryCode),
    }))

  return {
    totalVisits,
    countriesCount: topCountries.length,
    citiesCount: topCities.length,
    topCountries,
    topCities,
    weeks,
    currentVisitor: currentVisitorOverride ?? null,
  }
}
