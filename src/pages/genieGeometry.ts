export interface GenieRect {
  x: number
  y: number
  width: number
  height: number
}

export interface GenieRow {
  x: number
  y: number
  width: number
}

export const GENIE_ROWS = 96

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)))
  return t * t * (3 - 2 * t)
}

/**
 * A spring drives one reversible deformation field, rather than independently
 * tweening four corners. This keeps every row ordered, even during a reversal.
 *
 * 0–52%: the lower edge pinches toward the dock; the top retains its width.
 * 8–78%: the lower edge is pulled down, stretching the sheet behind it.
 * 34–100%: the upper edge follows and the curved sides straighten into a button.
 * Smoothstep gives the sides horizontal tangents at both ends of the sheet.
 */
export function getGenieRows(card: GenieRect, dock: GenieRect, progress: number): GenieRow[] {
  const pinch = smoothstep(0, 0.52, progress)
  const follow = smoothstep(0.34, 1, progress)
  const lowerPull = smoothstep(0.08, 0.78, progress)
  const top = mix(card.y, dock.y, follow)
  const bottom = mix(card.y + card.height, dock.y + dock.height, lowerPull)
  const center = mix(card.x + card.width / 2, dock.x + dock.width / 2, lowerPull)

  return Array.from({ length: GENIE_ROWS + 1 }, (_, index) => {
    const row = index / GENIE_ROWS
    const influence = mix(smoothstep(0, 1, row), 1, follow)
    const width = mix(card.width, dock.width, pinch * influence)

    return {
      x: center - width / 2,
      y: mix(top, bottom, row),
      width,
    }
  })
}

/** Match the actual moving surface, so it can be clicked throughout the flight. */
export function getGenieHitPath(rows: GenieRow[]) {
  const left = rows.map((row) => `${row.x.toFixed(2)} ${row.y.toFixed(2)}`)
  const right = [...rows].reverse().map((row) => `${(row.x + row.width).toFixed(2)} ${row.y.toFixed(2)}`)
  return `path("M ${left.join(" L ")} L ${right.join(" L ")} Z")`
}

/** Settle by visible geometry, rather than waiting for the spring's long tail. */
export function isGenieSettled(rows: GenieRow[], target: GenieRect) {
  return rows.every((row, index) => {
    const targetY = target.y + index / (rows.length - 1) * target.height
    return Math.abs(row.x - target.x) <= 0.5
      && Math.abs(row.x + row.width - target.x - target.width) <= 0.5
      && Math.abs(row.y - targetY) <= 0.5
  })
}
