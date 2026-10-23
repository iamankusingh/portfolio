import { defaultSettings, resolveFormat } from "./settings";
import type { FluidSettings, Format, TextureMode } from "./settings";
import { fragments, vertexShader } from "./shaders";

type Target = {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
};
type Pair = { read: Target; write: Target };
type Uniform = number | number[] | Target;
type Program = {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation>;
};
type Point = { x: number; y: number };

export type FluidEngine = ReturnType<typeof createFluidEngine>;

export function createFluidEngine(
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
  onError: (message: string) => void,
) {
  const context = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    preserveDrawingBuffer: false,
  });
  if (!context)
    throw new Error(
      "This experiment needs WebGL2. Try a browser with hardware acceleration enabled.",
    );
  const gl = context;
  const targets = new Set<Target>();
  const programs = new Map<keyof typeof fragments, Program>();
  const cleanups: (() => void)[] = [];
  let velocity: Pair;
  let dye: Pair;
  let pressure: Pair;
  let curl: Target;
  let divergence: Target;
  let format: Format = "fullscreen";
  let simulationRatio = 0;
  let settings = { ...defaultSettings };
  let eased = { ...settings };
  let colors = ["#1253AD", "#168FA8", "#51D4CF", "#B5EADF"];
  let activeColor = -1;
  let strokeColor = 0;
  let texture: TextureMode = "grain";
  let intensity = 0.25;
  let paused = true;
  let visible = true;
  let focused = true;
  let disposed = false;
  let lost = false;
  let frame = 0;
  let previousTime = 0;
  let pointer: { id: number; point: Point; color: string } | null = null;
  let keyboard: Point = { x: 0.5, y: 0.5 };
  const splats: { point: Point; dx: number; dy: number; color: string }[] = [];

  function removeTarget(target: Target) {
    gl.deleteTexture(target.texture);
    gl.deleteFramebuffer(target.framebuffer);
    targets.delete(target);
  }

  function dispose() {
    disposed = true;
    cancelAnimationFrame(frame);
    cleanups.forEach((cleanup) => cleanup());
    targets.forEach(removeTarget);
    programs.forEach(({ program }) => gl.deleteProgram(program));
    programs.clear();
  }

  function compile(type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Unable to create a fluid shader.");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Fluid shader compilation failed: ${message}`);
    }
    return shader;
  }

  function createTarget(width: number, height: number): Target {
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer) {
      gl.deleteTexture(texture);
      gl.deleteFramebuffer(framebuffer);
      throw new Error("Unable to allocate fluid textures.");
    }
    const target = { texture, framebuffer, width, height };
    targets.add(target);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA16F,
      width,
      height,
      0,
      gl.RGBA,
      gl.HALF_FLOAT,
      null,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(
        "Floating-point fluid rendering is unavailable on this device.",
      );
    }
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return target;
  }

  function draw(
    name: keyof typeof fragments,
    output: Target | null,
    values: Record<string, Uniform>,
  ) {
    const entry = programs.get(name);
    if (!entry) return;
    gl.useProgram(entry.program);
    let unit = 0;
    for (const [key, value] of Object.entries(values)) {
      const location = entry.uniforms.get(key);
      if (location === undefined) continue;
      if (typeof value === "number") gl.uniform1f(location, value);
      else if (Array.isArray(value)) {
        if (value.length === 2) gl.uniform2f(location, value[0], value[1]);
        else gl.uniform3f(location, value[0], value[1], value[2]);
      } else {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, value.texture);
        gl.uniform1i(location, unit++);
      }
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, output?.framebuffer ?? null);
    gl.viewport(
      0,
      0,
      output?.width ?? canvas.width,
      output?.height ?? canvas.height,
    );
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function swap(pair: Pair) {
    [pair.read, pair.write] = [pair.write, pair.read];
  }

  function makePair(longEdge: number): Pair {
    const { ratio } = getDimensions();
    const width = Math.max(1, Math.round(ratio >= 1 ? longEdge : longEdge * ratio));
    const height = Math.max(1, Math.round(ratio >= 1 ? longEdge / ratio : longEdge));
    return {
      read: createTarget(width, height),
      write: createTarget(width, height),
    };
  }

  function allocate() {
    velocity = makePair(192);
    pressure = makePair(192);
    dye = makePair(768);
    curl = createTarget(velocity.read.width, velocity.read.height);
    divergence = createTarget(velocity.read.width, velocity.read.height);
    simulationRatio = getDimensions().ratio;
  }

  function getDimensions() {
    return resolveFormat(format, stage.clientWidth, stage.clientHeight);
  }

  function reshape() {
    const oldTargets = [...targets];
    const previousDye = dye.read;
    try {
      allocate();
      draw("copy", dye.write, { source: previousDye });
      swap(dye);
      oldTargets.forEach(removeTarget);
      splats.length = 0;
      pointer = null;
      return true;
    } catch (error) {
      dispose();
      onError(error instanceof Error ? error.message : "Unable to resize the canvas.");
      return false;
    }
  }

  function render() {
    if (disposed || lost) return;
    draw("display", null, {
      source: dye.read,
      textureMode: texture === "paper" ? 2 : texture === "grain" ? 1 : 0,
      intensity,
      resolution: [canvas.width, canvas.height],
    });
  }

  function resize() {
    if (disposed || lost) return;
    const { ratio } = getDimensions();
    if (Math.abs(ratio - simulationRatio) > 0.001 && !reshape()) return;
    const width = Math.max(
      1,
      Math.min(stage.clientWidth, stage.clientHeight * ratio),
    );
    const height = width / ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const scale = Math.min(
      window.devicePixelRatio || 1,
      2,
      1600 / Math.max(width, height),
    );
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    render();
  }

  function inject(point: Point, dx: number, dy: number, hex: string) {
    const rgb = [1, 3, 5].map(
      (offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255,
    );
    const { ratio: aspect } = getDimensions();
    const common = {
      point: [point.x, point.y],
      radius: (eased.brush / 1000) * Math.min(aspect, 1),
      aspect,
    };
    draw("splat", velocity.write, {
      ...common,
      source: velocity.read,
      color: [dx * eased.force * 14, dy * eased.force * 14, 0],
      ink: 0,
    });
    swap(velocity);
    draw("splat", dye.write, {
      ...common,
      source: dye.read,
      color: rgb.map((channel) => channel * 0.65),
      ink: 1,
    });
    swap(dye);
  }

  function step(dt: number) {
    const texel = [1 / velocity.read.width, 1 / velocity.read.height];
    draw("advect", velocity.write, {
      source: velocity.read,
      velocity: velocity.read,
      texel,
      dt,
      decay: 0.16,
    });
    swap(velocity);
    draw("curl", curl, { source: velocity.read, texel });
    draw("vorticity", velocity.write, {
      source: velocity.read,
      curls: curl,
      texel,
      dt,
      strength: eased.swirl * 0.45,
    });
    swap(velocity);
    draw("divergence", divergence, { source: velocity.read, texel });
    // Start the Poisson solve from zero to avoid stale pressure after new strokes.
    gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.read.framebuffer);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let iteration = 0; iteration < 18; iteration++) {
      draw("pressure", pressure.write, {
        source: pressure.read,
        divergence,
        texel,
      });
      swap(pressure);
    }
    draw("project", velocity.write, {
      source: velocity.read,
      pressure: pressure.read,
      texel,
    });
    swap(velocity);
    draw("advect", dye.write, {
      source: dye.read,
      velocity: velocity.read,
      texel,
      dt,
      decay: 0.003,
    });
    swap(dye);
    draw("diffuse", dye.write, {
      source: dye.read,
      texel: [1 / dye.read.width, 1 / dye.read.height],
      amount: Math.min(0.8, (eased.diffusion / 100) * dt * 24),
    });
    swap(dye);
  }

  function isActive() {
    return (
      !disposed &&
      !lost &&
      visible &&
      focused &&
      !document.hidden &&
      !document.getElementById("site-navigation")?.hasAttribute("open")
    );
  }

  function tick(time: number) {
    frame = 0;
    if (!isActive()) return;
    const elapsed = previousTime
      ? Math.min((time - previousTime) / 1000, 1 / 30)
      : 1 / 60;
    previousTime = time;
    for (const key of Object.keys(settings) as (keyof FluidSettings)[]) {
      eased[key] +=
        (settings[key] - eased[key]) * (1 - Math.exp(-elapsed * 12));
    }
    splats
      .splice(0, 24)
      .forEach(({ point, dx, dy, color }) => inject(point, dx, dy, color));
    if (!paused) {
      const dt = elapsed * eased.speed;
      const steps = Math.max(1, Math.ceil(dt / (1 / 60)));
      for (let index = 0; index < steps; index++) step(dt / steps);
    }
    render();
    if (!paused || splats.length) frame = requestAnimationFrame(tick);
  }

  function wake() {
    if (!frame && isActive()) frame = requestAnimationFrame(tick);
  }

  function suspend() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    if (!isActive()) {
      pointer = null;
      splats.length = 0;
    } else wake();
  }

  function clear() {
    if (disposed || lost) return;
    splats.length = 0;
    pointer = null;
    targets.forEach((target) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    render();
  }

  function randomize() {
    if (disposed || lost) return;
    clear();
    // Seed curved, overlapping ribbons, then evolve them into a settled initial composition.
    const phase = Math.random() * Math.PI * 2;
    for (let index = 0; index < 32; index++) {
      const t = index / 31;
      const angle = t * Math.PI * 2 + phase;
      inject(
        { x: 0.16 + t * 0.68, y: 0.5 + Math.sin(angle) * 0.22 },
        Math.cos(angle) * 0.22,
        Math.sin(angle) * 0.22,
        colors[Math.floor(t * (colors.length - 1))],
      );
    }
    for (let index = 0; index < 18; index++) step(1 / 60);
    render();
    wake();
  }

  function pickColor() {
    return colors[
      activeColor < 0
        ? strokeColor++ % colors.length
        : activeColor % colors.length
    ];
  }

  function position(event: PointerEvent): Point {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height)),
    };
  }

  function queue(point: Point, dx: number, dy: number, color: string) {
    if (splats.length < 96) splats.push({ point, dx, dy, color });
    wake();
  }

  function pointerDown(event: PointerEvent) {
    if (pointer || event.button !== 0 || !isActive()) return;
    event.preventDefault();
    canvas.focus({ preventScroll: true });
    canvas.setPointerCapture(event.pointerId);
    pointer = {
      id: event.pointerId,
      point: position(event),
      color: pickColor(),
    };
    queue(pointer.point, 0, 0, pointer.color);
  }

  function pointerMove(event: PointerEvent) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const next = position(event);
    const dx = next.x - pointer.point.x;
    const dy = next.y - pointer.point.y;
    const distance = Math.hypot(dx * getDimensions().ratio, dy);
    const count = Math.min(
      12,
      Math.max(1, Math.ceil(distance / (settings.brush / 1600))),
    );
    for (let index = 1; index <= count; index++) {
      queue(
        {
          x: pointer.point.x + (dx * index) / count,
          y: pointer.point.y + (dy * index) / count,
        },
        dx / count,
        dy / count,
        pointer.color,
      );
    }
    pointer.point = next;
  }

  function pointerUp(event: PointerEvent) {
    if (pointer?.id !== event.pointerId) return;
    pointer = null;
    if (canvas.hasPointerCapture(event.pointerId))
      canvas.releasePointerCapture(event.pointerId);
  }

  function keyDown(event: KeyboardEvent) {
    const movements: Record<string, Point> = {
      ArrowLeft: { x: -0.025, y: 0 },
      ArrowRight: { x: 0.025, y: 0 },
      ArrowUp: { x: 0, y: 0.025 },
      ArrowDown: { x: 0, y: -0.025 },
    };
    const delta = movements[event.key];
    if (!delta && event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (!isActive()) return;
    if (delta)
      keyboard = {
        x: Math.max(0.03, Math.min(0.97, keyboard.x + delta.x)),
        y: Math.max(0.03, Math.min(0.97, keyboard.y + delta.y)),
      };
    queue(keyboard, delta?.x ?? 0.04, delta?.y ?? 0.015, pickColor());
  }

  try {
    if (!gl.getExtension("EXT_color_buffer_float"))
      throw new Error(
        "This device cannot render floating-point fluid textures. Try another browser or device.",
      );
    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    try {
      for (const name of Object.keys(fragments) as (keyof typeof fragments)[]) {
        const fragment = compile(gl.FRAGMENT_SHADER, fragments[name]);
        const program = gl.createProgram();
        if (!program) {
          gl.deleteShader(fragment);
          throw new Error("Unable to create a fluid program.");
        }
        const entry: Program = { program, uniforms: new Map() };
        programs.set(name, entry);
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        gl.deleteShader(fragment);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
          throw new Error(
            `Fluid program linking failed: ${gl.getProgramInfoLog(program)}`,
          );
        const count: number = gl.getProgramParameter(
          program,
          gl.ACTIVE_UNIFORMS,
        );
        for (let index = 0; index < count; index++) {
          const info = gl.getActiveUniform(program, index);
          if (info) {
            const location = gl.getUniformLocation(program, info.name);
            if (location !== null) entry.uniforms.set(info.name, location);
          }
        }
      }
    } finally {
      gl.deleteShader(vertex);
    }
    allocate();
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    cleanups.push(() => resizeObserver.disconnect());
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      suspend();
    });
    intersection.observe(canvas);
    cleanups.push(() => intersection.disconnect());
    const menu = document.getElementById("site-navigation");
    const menuObserver = new MutationObserver(suspend);
    if (menu)
      menuObserver.observe(menu, {
        attributes: true,
        attributeFilter: ["open"],
      });
    cleanups.push(() => menuObserver.disconnect());
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      suspend();
      onError(
        "The graphics context was interrupted. Restart the canvas to create a new composition.",
      );
    };
    const blur = () => {
      focused = false;
      suspend();
    };
    const focus = () => {
      focused = true;
      suspend();
    };
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("lostpointercapture", pointerUp);
    canvas.addEventListener("keydown", keyDown);
    document.addEventListener("visibilitychange", suspend);
    window.addEventListener("blur", blur);
    window.addEventListener("focus", focus);
    cleanups.push(() => {
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("lostpointercapture", pointerUp);
      canvas.removeEventListener("keydown", keyDown);
      document.removeEventListener("visibilitychange", suspend);
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
    });
  } catch (error) {
    dispose();
    throw error;
  }

  return {
    dispose,
    reset: clear,
    randomize,
    setSettings(next: FluidSettings) {
      settings = { ...next };
      if (paused) eased = { ...next };
      wake();
    },
    setPalette(next: string[], selected: number) {
      colors = [...next];
      activeColor = selected;
    },
    setPaused(next: boolean) {
      paused = next;
      previousTime = 0;
      wake();
    },
    setTexture(next: TextureMode, amount: number) {
      texture = next;
      intensity = amount;
      render();
    },
    setFormat(next: Format) {
      if (next === format || disposed || lost) return;
      format = next;
      if (reshape()) resize();
    },
    getDimensions,
    async capture(): Promise<Blob> {
      if (disposed || lost)
        throw new Error(
          "The canvas is unavailable. Restart it before capturing.",
        );
      const { width, height } = getDimensions();
      const maxSize: number = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
      if (Math.max(width, height) > maxSize)
        throw new Error("This device cannot export at the selected size.");
      const output = document.createElement("canvas");
      output.width = width;
      output.height = height;
      const context2d = output.getContext("2d");
      if (!context2d) throw new Error("Unable to create the image export.");
      try {
        canvas.width = width;
        canvas.height = height;
        render();
        // Copy synchronously before WebGL's unpreserved drawing buffer is cleared.
        context2d.drawImage(canvas, 0, 0);
      } finally {
        resize();
      }
      return new Promise((resolve, reject) =>
        output.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Image export failed. Please try again."));
        }, "image/png"),
      );
    },
  };
}
