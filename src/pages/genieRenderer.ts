import { GENIE_ROWS, getGenieRows, type GenieRect } from "./genieGeometry"

const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  uniform vec2 u_viewport;
  varying vec2 v_uv;
  void main() {
    vec2 clip = a_position / u_viewport * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    v_uv = a_uv;
  }
`

const fragmentShader = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_card;
  uniform sampler2D u_button;
  uniform sampler2D u_icon;
  uniform vec4 u_icon_bounds;
  uniform vec2 u_button_scale;
  uniform vec2 u_size;
  uniform float u_progress;
  uniform float u_focus;

  // Textures are uploaded premultiplied. Applying alpha to RGB a second time
  // darkens filtered glyph edges; source-over applies coverage exactly once.
  vec3 over(vec3 background, vec4 ink, float opacity) {
    return ink.rgb * opacity + background * (1.0 - ink.a * opacity);
  }

  void main() {
    // Elliptical radii compensate for the mesh's final nonuniform contraction:
    // both endpoints have genuinely round corners (28px card / 18px button).
    float finish = smoothstep(0.65, 1.0, u_progress);
    vec2 radius = mix(vec2(28.0), 18.0 * u_size / vec2(196.0, 56.0), finish);
    vec2 q = abs((v_uv - 0.5) * u_size) - (u_size * 0.5 - radius);
    float edge = length(max(q, 0.0) / radius);
    float alpha = 1.0 - smoothstep(0.97, 1.0, edge);

    vec4 card = texture2D(u_card, v_uv);
    vec4 button = texture2D(u_button, (v_uv - 0.5) * u_button_scale + 0.5);
    // The lower content yields first. The title lasts longer, while the shared
    // speech bubble moves continuously into its place beside the button label.
    float contentFade = 1.0 - smoothstep(0.14, 0.42, u_progress);
    if (v_uv.y > 0.70) contentFade = 1.0 - smoothstep(0.02, 0.30, u_progress);
    else if (v_uv.y > 0.56) contentFade = 1.0 - smoothstep(0.08, 0.44, u_progress);
    else if (v_uv.y < 0.40) contentFade = 1.0 - smoothstep(0.12, 0.42, u_progress);

    // One owner while moving: no simultaneous DOM copy, and no overlap between
    // the outgoing title and incoming label. The shared icon bridges the change.
    float buttonReveal = smoothstep(0.46, 0.86, u_progress);
    vec2 iconUV = (v_uv - u_icon_bounds.xy) / u_icon_bounds.zw + 0.5;
    float iconMask = step(0.0, iconUV.x) * step(iconUV.x, 1.0)
      * step(0.0, iconUV.y) * step(iconUV.y, 1.0);
    vec4 icon = texture2D(u_icon, iconUV);
    vec3 color = over(vec3(80.0, 88.0, 232.0) / 255.0, card, contentFade);
    color = over(color, button, buttonReveal);
    color = over(color, icon, iconMask);
    color = mix(color, vec3(0.86, 0.88, 1.0), u_focus * smoothstep(0.86, 0.94, edge));
    gl_FragColor = vec4(color * alpha, alpha);
  }
`

function messageIcon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 24, size / 24)
  ctx.strokeStyle = "#fff"
  ctx.lineWidth = 1.6
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.stroke(new Path2D("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"))
  ctx.restore()
}

function artwork(width: number, kind: "card" | "button" | "icon") {
  const height = kind === "card" ? 280 : kind === "button" ? 56 : width
  const canvas = document.createElement("canvas")
  // Power-of-two textures support mipmaps in WebGL 1. They keep small lettering
  // smooth as different rows contract by different amounts through the funnel.
  canvas.width = 2 ** Math.ceil(Math.log2(width * 2))
  canvas.height = 2 ** Math.ceil(Math.log2(height * 2))
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas drawing is unavailable")
  ctx.scale(canvas.width / width, canvas.height / height)
  ctx.fillStyle = "#fff"
  ctx.textBaseline = "middle"

  if (kind === "icon") {
    messageIcon(ctx, 0, 0, width)
  } else if (kind === "button") {
    ctx.font = "500 14px Inter, sans-serif"
    const labelWidth = ctx.measureText("Give Feedback").width
    const start = (width - labelWidth - 28) / 2
    ctx.fillText("Give Feedback", start + 28, 28)
  } else {
    ctx.fillStyle = "rgb(255 255 255 / 9%)"
    ctx.strokeStyle = "rgb(255 255 255 / 17%)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(width / 2 - 27, 48, 54, 54, 17)
    ctx.fill()
    ctx.stroke()
    ctx.textAlign = "center"
    ctx.fillStyle = "#fff"
    ctx.font = "550 28px Inter, sans-serif"
    if ("letterSpacing" in ctx) ctx.letterSpacing = "-1px"
    ctx.fillText("Have a thought?", width / 2, 140)
    ctx.fillStyle = "#e1e3ff"
    ctx.font = `400 ${width < 400 ? 12 : 13}px Inter, sans-serif`
    if ("letterSpacing" in ctx) ctx.letterSpacing = "-0.2px"
    ctx.fillText("There’s always room for a little feedback.", width / 2, 177)
    ctx.font = "400 11px Inter, sans-serif"
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px"
    ctx.fillText("Click to minimize", width / 2 - 10, 224)
    ctx.save()
    ctx.translate(width / 2 + 56, 216)
    ctx.strokeStyle = "#e1e3ff"
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.moveTo(3, 3)
    ctx.lineTo(12, 12)
    ctx.moveTo(12, 4)
    ctx.lineTo(12, 12)
    ctx.lineTo(4, 12)
    ctx.stroke()
    ctx.restore()
  }
  return canvas
}

export interface GenieRenderer {
  resize: (width: number, height: number, card: GenieRect, dock: GenieRect) => void
  draw: (progress: number) => ReturnType<typeof getGenieRows>
  focus: (focused: boolean) => void
  dispose: () => void
}

/** One textured triangle mesh: the lettering deforms with the surface, without seams. */
export function createGenieRenderer(canvas: HTMLCanvasElement): GenieRenderer | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true })
  if (!gl) return null

  const shaders: WebGLShader[] = []
  const textures: WebGLTexture[] = []
  const buffers: WebGLBuffer[] = []
  const program = gl.createProgram()
  if (!program) return null

  const dispose = () => {
    shaders.forEach((shader) => gl.deleteShader(shader))
    textures.forEach((texture) => gl.deleteTexture(texture))
    buffers.forEach((buffer) => gl.deleteBuffer(buffer))
    gl.deleteProgram(program)
  }

  for (const [type, source] of [[gl.VERTEX_SHADER, vertexShader], [gl.FRAGMENT_SHADER, fragmentShader]] as const) {
    const shader = gl.createShader(type)
    if (!shader) { dispose(); return null }
    shaders.push(shader)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null }
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null }
  gl.useProgram(program)
  // Premultiply before filtering/mipmap generation, so transparent texels cannot
  // introduce black fringes into white text and icons.
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)

  const positions = new Float32Array((GENIE_ROWS + 1) * 4)
  const uvs = new Float32Array((GENIE_ROWS + 1) * 4)
  for (let row = 0; row <= GENIE_ROWS; row++) {
    uvs.set([0, row / GENIE_ROWS, 1, row / GENIE_ROWS], row * 4)
  }

  function attribute(name: string, data: Float32Array, usage: number) {
    const buffer = gl!.createBuffer()
    if (!buffer) throw new Error("Unable to allocate mesh buffer")
    buffers.push(buffer)
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer)
    gl!.bufferData(gl!.ARRAY_BUFFER, data, usage)
    const location = gl!.getAttribLocation(program!, name)
    gl!.enableVertexAttribArray(location)
    gl!.vertexAttribPointer(location, 2, gl!.FLOAT, false, 0, 0)
    return buffer
  }

  let positionBuffer: WebGLBuffer
  try {
    positionBuffer = attribute("a_position", positions, gl.DYNAMIC_DRAW)
    attribute("a_uv", uvs, gl.STATIC_DRAW)
    for (const name of ["u_card", "u_button", "u_icon"]) {
      const texture = gl.createTexture()
      if (!texture) throw new Error("Unable to allocate card texture")
      const unit = textures.length
      textures.push(texture)
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.uniform1i(gl.getUniformLocation(program, name), unit)
    }
  } catch {
    dispose()
    return null
  }

  const uniforms = {
    viewport: gl.getUniformLocation(program, "u_viewport"),
    size: gl.getUniformLocation(program, "u_size"),
    progress: gl.getUniformLocation(program, "u_progress"),
    focus: gl.getUniformLocation(program, "u_focus"),
    iconBounds: gl.getUniformLocation(program, "u_icon_bounds"),
    buttonScale: gl.getUniformLocation(program, "u_button_scale"),
  }
  let card: GenieRect = { x: 0, y: 0, width: 440, height: 280 }
  let dock: GenieRect = { x: 0, y: 0, width: 196, height: 56 }
  let textureWidth = 0
  let compactIconCenter = 0

  return {
    resize(width, height, nextCard, nextDock) {
      card = nextCard
      dock = nextDock
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniforms.viewport, width, height)
      gl.uniform2f(uniforms.size, card.width, card.height)
      if (textureWidth !== card.width) {
        textureWidth = card.width
        textures.forEach((texture, index) => {
          gl.activeTexture(gl.TEXTURE0 + index)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
            artwork(index === 0 ? card.width : index === 1 ? dock.width : 64,
              index === 0 ? "card" : index === 1 ? "button" : "icon"))
          gl.generateMipmap(gl.TEXTURE_2D)
        })
        const ctx = document.createElement("canvas").getContext("2d")
        if (ctx) {
          ctx.font = "500 14px Inter, sans-serif"
          compactIconCenter = (dock.width - ctx.measureText("Give Feedback").width - 28) / 2 + 9
        }
      }
    },
    draw(progress) {
      const rows = getGenieRows(card, dock, progress)
      const t = Math.max(0, Math.min(1, (progress - 0.12) / 0.76))
      const follow = t * t * (3 - 2 * t)
      const iconY = 75 / 280 + (0.5 - 75 / 280) * follow
      const iconSize = 27 + (18 - 27) * follow
      const row = rows[Math.round(iconY * GENIE_ROWS)]
      const iconX = 0.5 + (compactIconCenter - dock.width / 2) * follow / row.width
      const sheetHeight = rows[GENIE_ROWS].y - rows[0].y
      gl.uniform4f(uniforms.iconBounds, iconX, iconY, iconSize / row.width, iconSize / sheetHeight)
      gl.uniform2f(uniforms.buttonScale, rows[GENIE_ROWS / 2].width / dock.width, sheetHeight / dock.height)
      rows.forEach((row, index) => positions.set([row.x, row.y, row.x + row.width, row.y], index * 4))
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions)
      gl.uniform1f(uniforms.progress, progress)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, (GENIE_ROWS + 1) * 2)
      return rows
    },
    focus(focused) { gl.uniform1f(uniforms.focus, focused ? 1 : 0) },
    dispose,
  }
}
