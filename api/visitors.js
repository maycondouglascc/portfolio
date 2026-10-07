/**
 * Vercel Serverless Function: Geolocation detection and visitor tallying.
 *
 * Utiliza os headers automáticos de geolocalização do Vercel Edge/Serverless:
 * - x-vercel-ip-city
 * - x-vercel-ip-country
 * - x-vercel-ip-country-region
 * - x-vercel-ip-latitude
 * - x-vercel-ip-longitude
 */

const COUNTRY_NAMES = {
  BR: "Brasil",
  US: "United States",
  PT: "Portugal",
  DE: "Alemanha",
  GB: "Reino Unido",
  CA: "Canadá",
  NL: "Holanda",
  ES: "Espanha",
  FR: "França",
  AR: "Argentina",
  CL: "Chile",
  JP: "Japão",
  AU: "Austrália",
  IE: "Irlanda",
  IT: "Itália",
  MX: "México",
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  try {
    const rawCity = req.headers["x-vercel-ip-city"]
    const countryCode = (req.headers["x-vercel-ip-country"] || "BR").toString().toUpperCase()
    const region = req.headers["x-vercel-ip-country-region"] || ""

    let city = "São Paulo"
    if (rawCity) {
      try {
        city = decodeURIComponent(rawCity.toString())
      } catch {
        city = rawCity.toString()
      }
    }

    const country = COUNTRY_NAMES[countryCode] || countryCode

    const visitor = {
      city,
      country,
      countryCode,
      region,
      timestamp: new Date().toISOString(),
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8")
    return res.status(200).json({
      success: true,
      visitor,
    })
  } catch (error) {
    console.error("Error detecting visitor:", error)
    return res.status(200).json({
      success: true,
      visitor: {
        city: "São Paulo",
        country: "Brasil",
        countryCode: "BR",
        region: "SP",
      },
    })
  }
}
