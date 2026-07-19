/**
 * Serve propostas HTML públicas a partir do Vercel Blob.
 * Rewrite: /proposta-:slug → /api/proposta?slug=:slug
 *
 * Env: BLOB_READ_WRITE_TOKEN (mesmo store usado pelo ProspectOS ao publicar).
 */
import { list } from "@vercel/blob"

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD")
    return res.status(405).send("Method Not Allowed")
  }

  const raw = (req.query.slug || "").toString().trim().toLowerCase()
  const slug = raw.replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "")
  if (!slug) {
    return res.status(404).send("Proposta não encontrada")
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN ausente")
    return res.status(503).send("Propostas indisponíveis no momento")
  }

  try {
    const pathname = `propostas/${slug}.html`
    const { blobs } = await list({ prefix: pathname, limit: 10, token })
    const blob = blobs.find((b) => b.pathname === pathname) || blobs[0]
    if (!blob?.url) {
      return res.status(404).send("Proposta não encontrada")
    }

    const upstream = await fetch(blob.url)
    if (!upstream.ok) {
      return res.status(404).send("Proposta não encontrada")
    }

    const html = await upstream.text()
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300")
    if (req.method === "HEAD") {
      return res.status(200).end()
    }
    return res.status(200).send(html)
  } catch (erro) {
    console.error("Erro ao servir proposta", slug, erro)
    return res.status(500).send("Erro ao carregar proposta")
  }
}
