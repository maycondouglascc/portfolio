/**
 * Vercel Serverless Function: Glance App Installation & Download Telemetry
 *
 * POST /api/glance-telemetry
 *   Receives anonymous installation ping from install.sh.
 *   Persists aggregate counts to Vercel Blob (if configured) and logs event.
 *
 * GET /api/glance-telemetry
 *   Returns aggregated install stats (GitHub Releases downloads + install.sh runs).
 */
import { get, put } from "@vercel/blob"

const BLOB_PATH = "glance/installations.json"

async function streamToText(stream) {
  const reader = stream.getReader()
  const decoder = new TextDecoder("utf-8")
  let text = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    text += decoder.decode(value, { stream: true })
  }
  text += decoder.decode()
  return text
}

async function getStoredInstalls(token) {
  if (!token) return null
  try {
    const res = await get(BLOB_PATH, {
      access: "private",
      token,
      useCache: false,
    })
    if (res && res.statusCode === 200 && res.stream) {
      const text = await streamToText(res.stream)
      return JSON.parse(text)
    }
  } catch (err) {
    console.warn("Could not read stored installs from Blob:", err.message)
  }
  return null
}

async function saveInstalls(data, token) {
  if (!token) return
  try {
    await put(BLOB_PATH, JSON.stringify(data, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token,
    })
  } catch (err) {
    console.error("Could not save installs to Blob:", err.message)
    throw err
  }
}

async function fetchGitHubDownloadStats() {
  try {
    const headers = {
      "User-Agent": "MayconDouglas-Portfolio-GlanceStats",
      Accept: "application/vnd.github.v3+json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch("https://api.github.com/repos/maycondouglascc/glance/releases", {
      headers,
    })
    if (!res.ok) {
      return { totalDownloads: 0, byAsset: {}, byRelease: {} }
    }

    const releases = await res.json()
    if (!Array.isArray(releases)) {
      return { totalDownloads: 0, byAsset: {}, byRelease: {} }
    }

    let totalDownloads = 0
    const byAsset = {}
    const byRelease = {}

    for (const rel of releases) {
      const tag = rel.tag_name || "unknown"
      let releaseTotal = 0

      for (const asset of rel.assets || []) {
        const name = asset.name || ""
        const count = asset.download_count || 0

        // Exclude checksum hashes from total download count
        if (!name.endsWith(".sha256")) {
          totalDownloads += count
          releaseTotal += count
          byAsset[name] = (byAsset[name] || 0) + count
        }
      }
      byRelease[tag] = releaseTotal
    }

    return { totalDownloads, byAsset, byRelease }
  } catch (err) {
    console.error("Failed to fetch GitHub releases:", err.message)
    return { totalDownloads: 0, byAsset: {}, byRelease: {} }
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {})
      const version = String(body.version || "unknown").slice(0, 32)
      const arch = String(body.arch || "unknown").slice(0, 32)
      const os = String(body.os || "Linux").slice(0, 32)
      const method = String(body.method || "script").slice(0, 32)

      const countryCode = (req.headers["x-vercel-ip-country"] || "XX").toString().toUpperCase()
      const city = req.headers["x-vercel-ip-city"]
        ? decodeURIComponent(req.headers["x-vercel-ip-city"].toString())
        : ""

      const event = {
        timestamp: new Date().toISOString(),
        version,
        arch,
        os,
        method,
        countryCode,
        city,
      }

      console.log("[GLANCE_INSTALL_EVENT]", JSON.stringify(event))

      let stored = await getStoredInstalls(token)
      if (!stored) {
        stored = {
          totalScriptInstalls: 0,
          byCountry: {},
          byArch: {},
          byVersion: {},
          recent: [],
        }
      }

      stored.totalScriptInstalls = (stored.totalScriptInstalls || 0) + 1
      stored.byCountry[countryCode] = (stored.byCountry[countryCode] || 0) + 1
      stored.byArch[arch] = (stored.byArch[arch] || 0) + 1
      stored.byVersion[version] = (stored.byVersion[version] || 0) + 1

      stored.recent = [event, ...(stored.recent || [])].slice(0, 50)

      await saveInstalls(stored, token)

      return res.status(200).json({
        success: true,
        message: "Installation successfully recorded",
        totalScriptInstalls: stored.totalScriptInstalls,
      })
    } catch (err) {
      console.error("Error processing telemetry ping:", err)
      return res.status(200).json({
        success: true,
        message: "Telemetry processed with fallback",
      })
    }
  }

  if (req.method === "GET") {
    const githubStats = await fetchGitHubDownloadStats()
    const stored = (await getStoredInstalls(token)) || {
      totalScriptInstalls: 0,
      byCountry: {},
      byArch: {},
      byVersion: {},
      recent: [],
    }

    const scriptTotal = stored.totalScriptInstalls || 0
    const combinedTotal = githubStats.totalDownloads + scriptTotal

    res.setHeader("Content-Type", "application/json; charset=utf-8")
    if (req.query && (req.query.no_cache || req.query.fresh)) {
      res.setHeader("Cache-Control", "no-store, max-age=0")
    } else {
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120")
    }

    return res.status(200).json({
      success: true,
      combinedTotal,
      githubDownloads: githubStats,
      scriptInstalls: {
        totalScriptInstalls: scriptTotal,
        byCountry: stored.byCountry,
        byArch: stored.byArch,
        byVersion: stored.byVersion,
        recent: (stored.recent || []).slice(0, 10),
      },
    })
  }

  res.setHeader("Allow", "GET, POST, OPTIONS")
  return res.status(405).send("Method Not Allowed")
}
