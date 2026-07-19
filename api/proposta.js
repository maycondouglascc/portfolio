/**
 * Serve propostas HTML a partir do Vercel Blob (store private).
 * Rewrite: /proposta-:slug → /api/proposta?slug=:slug
 *
 * O lead abre maycondouglas.work/proposta-{slug}; esta função autentica no Blob
 * com BLOB_READ_WRITE_TOKEN e devolve o HTML.
 */
import { get } from "@vercel/blob"

async function streamParaTexto(stream) {
  const reader = stream.getReader()
  const decoder = new TextDecoder("utf-8")
  let texto = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    texto += decoder.decode(value, { stream: true })
  }
  texto += decoder.decode()
  return texto
}

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
    const resultado = await get(pathname, {
      access: "private",
      token,
      useCache: false,
    })

    if (!resultado || resultado.statusCode !== 200 || !resultado.stream) {
      return res.status(404).send("Proposta não encontrada")
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300")
    if (req.method === "HEAD") {
      return res.status(200).end()
    }

    const html = await streamParaTexto(resultado.stream)
    return res.status(200).send(html)
  } catch (erro) {
    console.error("Erro ao servir proposta", slug, erro)
    return res.status(500).send("Erro ao carregar proposta")
  }
}
