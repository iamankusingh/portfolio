import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import useMediaQuery from "../../hooks/useMediaQuery";
import { anku } from "../../data/anku";

// An editorial update date, rather than the date of the visitor's session.
const lastUpdated = { date: "2026-10-13", label: "October 2026" };
const links = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Photography", to: "/photography" },
  { label: "Lab", to: "/lab" },
  { label: "Contact", to: "/contact" },
];

// Fixed irregular scattering keeps all thirteen stars visible without shifting on rerenders.
const stars = [
  { x: 0.083, y: 0.273, size: 2.1, brightness: 0.65 },
  { x: 0.726, y: 0.086, size: 1.3, brightness: 0.4 },
  { x: 0.312, y: 0.137, size: 2.7, brightness: 0.8 },
  { x: 0.884, y: 0.321, size: 1.7, brightness: 0.55 },
  { x: 0.194, y: 0.348, size: 1.2, brightness: 0.35 },
  { x: 0.648, y: 0.294, size: 2.0, brightness: 0.7 },
  { x: 0.137, y: 0.092, size: 1.4, brightness: 0.45 },
  { x: 0.938, y: 0.164, size: 2.5, brightness: 0.85 },
  { x: 0.369, y: 0.181, size: 1.6, brightness: 0.5 },
  { x: 0.587, y: 0.061, size: 1.8, brightness: 0.6 },
  { x: 0.773, y: 0.219, size: 2.8, brightness: 0.9 },
  { x: 0.843, y: 0.109, size: 2.0, brightness: 0.7 },
  { x: 0.267, y: 0.319, size: 1.2, brightness: 0.4 },
];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform mat4 textureMatrix;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec4 vReflection;
  varying float vHeight;

  vec3 gerstner(vec2 point, vec2 direction, float wavelength, float amplitude, float speed) {
    vec2 dir = normalize(direction);
    float phase = dot(dir, point) * (6.2831853 / wavelength) - uTime * speed;
    return vec3(dir.x * cos(phase) * amplitude * 0.45,
      sin(phase) * amplitude, dir.y * cos(phase) * amplitude * 0.45);
  }

  vec3 oceanPoint(vec2 point) {
    float radius = length(point - vec2(0.0, -8.0));
    // Open sea: keep full wave depth nearby and settle the distant horizon.
    float envelope = 1.0 - smoothstep(100.0, 220.0, radius);
    vec3 displacement = gerstner(point, vec2(1.0, 0.32), 21.0, 0.42, 0.9)
      + gerstner(point, vec2(-0.38, 1.0), 13.0, 0.25, 1.15)
      + gerstner(point, vec2(0.72, -1.0), 8.0, 0.14, 1.4)
      + gerstner(point, vec2(-1.0, -0.21), 5.4, 0.065, 1.8);
    return vec3(point.x, -0.15, point.y) + displacement * envelope;
  }

  void main() {
    vec4 rest = modelMatrix * vec4(position, 1.0);
    vec3 world = oceanPoint(rest.xz);
    // Tangents include horizontal travel and shoreline/horizon attenuation.
    vec3 tangentX = oceanPoint(rest.xz + vec2(0.08, 0.0)) - world;
    vec3 tangentZ = oceanPoint(rest.xz + vec2(0.0, 0.08)) - world;
    vNormal = normalize(cross(tangentZ, tangentX));
    vHeight = world.y + 0.15;
    vWorld = world;
    vReflection = textureMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMoonPosition;
  uniform sampler2D tDiffuse;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying vec4 vReflection;
  varying float vHeight;

  void main() {
    vec3 normal = normalize(vNormal);
    vec2 ripplePoint = vWorld.xz * 2.2;
    float resolved = 1.0 - smoothstep(0.3, 1.5, length(fwidth(ripplePoint)));
    normal.x += sin(ripplePoint.x + ripplePoint.y * 0.43 - uTime * 1.9) * 0.028 * resolved;
    normal.z += cos(ripplePoint.y - ripplePoint.x * 0.37 + uTime * 1.4) * 0.028 * resolved;
    normal = normalize(normal);
    vec3 viewDirection = normalize(cameraPosition - vWorld);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = 0.025 + 0.975 * pow(1.0 - facing, 5.0);

    // Reflect the actual moon through the same planar pass as the hero ocean.
    vec2 reflectionUv = vReflection.xy / vReflection.w;
    reflectionUv = clamp(reflectionUv + normal.xz * 0.024, vec2(0.002), vec2(0.998));
    vec2 blur = vec2(1.0 / 1024.0);
    vec3 reflection = texture2D(tDiffuse, reflectionUv).rgb * 0.5;
    reflection += texture2D(tDiffuse, reflectionUv + blur).rgb * 0.25;
    reflection += texture2D(tDiffuse, reflectionUv - blur).rgb * 0.25;

    vec3 water = mix(vec3(0.008, 0.019, 0.028), vec3(0.025, 0.055, 0.072), fresnel);
    water *= 0.85 + 0.25 * normal.y + vHeight * 0.14;
    vec3 color = mix(water, reflection, 0.22 + fresnel * 0.68);
    vec3 moonDirection = normalize(uMoonPosition - vWorld);
    vec3 halfVector = normalize(moonDirection + viewDirection);
    float specular = max(dot(normal, halfVector), 0.0);
    // A narrow silver glint rides on a softer, broken path of reflected light.
    color += vec3(0.72, 0.83, 0.95)
      * (pow(specular, 170.0) * 1.1 + pow(specular, 42.0) * 0.1);
    float foam = smoothstep(0.52, 0.76, vHeight) * smoothstep(0.06, 0.18, 1.0 - normal.y);
    color = mix(color, vec3(0.18, 0.24, 0.28), foam * 0.2);
    float haze = smoothstep(100.0, 230.0, length(cameraPosition - vWorld));
    color = mix(color, vec3(0.009, 0.014, 0.02), haze);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function Footer() {
  const host = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [failed, setFailed] = useState(false);
  const [saveData] = useState(() => {
    const connection = "connection" in navigator ? navigator.connection : null;
    return Boolean(
      connection &&
      typeof connection === "object" &&
      "saveData" in connection &&
      connection.saveData === true,
    );
  });

  useEffect(() => {
    const element = host.current;
    if (!element || reducedMotion || saveData) return;
    let disposed = false;
    let requested = false;
    let nearby = false;
    let unavailable = false;
    let idle: number | undefined;
    let prepareTimer: number | undefined;
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let render: ((delta: number) => void) | undefined;
    let release: (() => void) | undefined;
    const menu = document.getElementById("site-navigation");
    const canAnimate = () =>
      visible && !document.hidden && !menu?.hasAttribute("open");
    const cancelPreparation = () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (prepareTimer !== undefined) window.clearTimeout(prepareTimer);
      idle = undefined;
      prepareTimer = undefined;
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const fail = (error: unknown) => {
      if (disposed) return;
      unavailable = true;
      cancelPreparation();
      console.error("The optional footer water is unavailable.", error);
      stop();
      render = undefined;
      release?.();
      release = undefined;
      setFailed(true);
    };
    const tick = (time: number) => {
      frame = 0;
      if (disposed || !canAnimate() || !render) return;
      try {
        render(previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0);
        previousTime = time;
        frame = requestAnimationFrame(tick);
      } catch (error) {
        fail(error);
      }
    };
    const load = async () => {
      requested = true;
      try {
        const [THREE, { Reflector }] = await Promise.all([
          import("three"),
          import("three/addons/objects/Reflector.js"),
        ]);
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const cleanup: (() => void)[] = [() => renderer.dispose()];
        release = () => {
          while (cleanup.length) cleanup.pop()?.();
        };
        renderer.debug.onShaderError = () => {
          throw new Error("The moonlit water shader could not compile.");
        };
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2000);
        camera.position.set(0, 5, 18);
        camera.lookAt(0, 3, -45);
        renderer.setClearColor(0x07090a);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.className = "absolute inset-0 h-full w-full";
        // Match the hero's dense foreground / extended horizon mesh, with
        // additional subdivisions and a higher-resolution reflection target.
        const geometry = new THREE.PlaneGeometry(1800, 1800, 320, 320);
        cleanup.push(() => geometry.dispose());
        const positions = geometry.attributes.position;
        const oceanCoordinate = (value: number) => {
          const distance = Math.abs(value);
          const coordinate =
            distance <= 0.7
              ? Math.pow(distance / 0.7, 1.5) * 80
              : 80 + ((distance - 0.7) / 0.3) * 820;
          return Math.sign(value) * coordinate;
        };
        for (let i = 0; i < positions.count; i++) {
          positions.setXY(
            i,
            oceanCoordinate(positions.getX(i) / 900),
            oceanCoordinate(positions.getY(i) / 900),
          );
        }
        positions.needsUpdate = true;
        const water = new Reflector(geometry, {
          textureWidth: 1024,
          textureHeight: 1024,
          clipBias: 0.003,
          multisample: 4,
          shader: {
            name: "MoonlitGerstnerOcean",
            uniforms: {
              tDiffuse: { value: null },
              textureMatrix: { value: new THREE.Matrix4() },
              color: { value: new THREE.Vector3(1, 1, 1) },
              uTime: { value: 0 },
              uMoonPosition: { value: new THREE.Vector3(0, 16, -90) },
            },
            vertexShader,
            fragmentShader,
          },
        });
        // Reflector owns its shader material and reflection render target.
        cleanup.push(() => water.dispose());
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, -0.15, -8);
        water.frustumCulled = false;
        scene.add(water);
        const moonGeometry = new THREE.SphereGeometry(3.8, 48, 32);
        cleanup.push(() => moonGeometry.dispose());
        const moonMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(1.2, 1.2, 1.16),
          toneMapped: false,
        });
        cleanup.push(() => moonMaterial.dispose());
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(0, 16, -90);
        scene.add(moon);
        // Two soft falloffs suggest light scattered through thin atmosphere.
        // This lives in the scene so the water reflects the halo as well.
        const haloGeometry = new THREE.PlaneGeometry(40, 40);
        cleanup.push(() => haloGeometry.dispose());
        const haloMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {},
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              float radius = length((vUv - 0.5) * 2.0);
              float inner = exp(-radius * radius * 24.0) * 0.24;
              float outer = exp(-radius * radius * 5.0) * 0.065;
              float fade = 1.0 - smoothstep(0.65, 1.0, radius);
              vec3 tint = mix(vec3(0.65, 0.76, 0.9), vec3(1.0, 0.96, 0.85),
                exp(-radius * radius * 18.0));
              gl_FragColor = vec4(tint, (inner + outer) * fade);
            }
          `,
        });
        cleanup.push(() => haloMaterial.dispose());
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        halo.position.copy(moon.position);
        halo.position.z -= 1;
        scene.add(halo);
        const starGeometry = new THREE.BufferGeometry();
        cleanup.push(() => starGeometry.dispose());
        const starPositions = new THREE.Float32BufferAttribute(
          new Float32Array(stars.length * 3),
          3,
        );
        starGeometry.setAttribute("position", starPositions);
        starGeometry.setAttribute(
          "aSize",
          new THREE.Float32BufferAttribute(
            stars.map((star) => star.size),
            1,
          ),
        );
        starGeometry.setAttribute(
          "aBrightness",
          new THREE.Float32BufferAttribute(
            stars.map((star) => star.brightness),
            1,
          ),
        );
        starGeometry.setAttribute(
          "aPhase",
          new THREE.Float32BufferAttribute(
            stars.map((_, i) => i * 2.399),
            1,
          ),
        );
        const starMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: renderer.getPixelRatio() },
          },
          vertexShader: /* glsl */ `
            uniform float uTime;
            uniform float uPixelRatio;
            attribute float aSize;
            attribute float aBrightness;
            attribute float aPhase;
            varying float vBrightness;
            void main() {
              float pulse = sin(uTime * (0.65 + aBrightness * 0.45) + aPhase);
              vBrightness = aBrightness * (0.76 + 0.24 * pulse);
              gl_PointSize = (aSize + 1.0) * uPixelRatio;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            varying float vBrightness;
            void main() {
              float radius = length(gl_PointCoord - 0.5);
              float alpha = 1.0 - smoothstep(0.12, 0.5, radius);
              gl_FragColor = vec4(0.84, 0.9, 1.0, alpha * vBrightness);
            }
          `,
        });
        cleanup.push(() => starMaterial.dispose());
        const starField = new THREE.Points(starGeometry, starMaterial);
        starField.frustumCulled = false;
        scene.add(starField);
        const resizeScene = () => {
          const { width, height } = element.getBoundingClientRect();
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld();
          stars.forEach((star, i) => {
            const ray = new THREE.Vector3(star.x * 2 - 1, 1 - star.y * 2, 0.5)
              .unproject(camera)
              .sub(camera.position)
              .normalize();
            const point = ray
              .multiplyScalar((-160 - camera.position.z) / ray.z)
              .add(camera.position);
            starPositions.setXYZ(i, point.x, point.y, point.z);
          });
          starPositions.needsUpdate = true;
          renderer.setSize(width, height, false);
        };
        const resize = new ResizeObserver(resizeScene);
        cleanup.push(() => resize.disconnect());
        const contextLost = (event: Event) => {
          event.preventDefault();
          fail("WebGL context lost; showing the static night scene.");
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        cleanup.push(() =>
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          ),
        );
        resize.observe(element);
        resizeScene();
        cleanup.push(() => renderer.domElement.remove());
        // Compile before entering the footer; the first real frame also warms
        // the reflection target. Continuous rendering still requires visibility.
        await renderer.compileAsync(scene, camera);
        if (disposed || unavailable) return;
        render = (delta) => {
          starMaterial.uniforms.uTime.value += delta;
          if (water.material instanceof THREE.ShaderMaterial) {
            water.material.uniforms.uTime.value += delta;
          }
          renderer.render(scene, camera);
          // Reveal only a completed frame, never the loading fallback.
          if (!renderer.domElement.isConnected) {
            element.appendChild(renderer.domElement);
          }
        };
        if (!document.hidden && !menu?.hasAttribute("open")) render(0);
        sync();
      } catch (error) {
        fail(error);
      }
    };
    const sync = () => {
      if (disposed || unavailable) return;
      if (!nearby || document.hidden || menu?.hasAttribute("open")) {
        cancelPreparation();
      } else if (!requested && idle === undefined && prepareTimer === undefined) {
        const prepare = () => {
          idle = undefined;
          prepareTimer = undefined;
          if (!disposed && !requested && !document.hidden && !menu?.hasAttribute("open"))
            void load();
        };
        if (typeof window.requestIdleCallback === "function") {
          idle = window.requestIdleCallback(prepare, { timeout: 1200 });
        } else {
          prepareTimer = window.setTimeout(prepare, 100);
        }
      }
      if (canAnimate()) {
        if (!requested) {
          cancelPreparation();
          void load();
        }
        if (render && !frame) frame = requestAnimationFrame(tick);
      } else stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const preparationObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      sync();
    }, { rootMargin: "1600px 0px" });
    const menuObserver = new MutationObserver(sync);
    if (menu)
      menuObserver.observe(menu, {
        attributes: true,
        attributeFilter: ["open"],
      });
    observer.observe(element);
    preparationObserver.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      stop();
      cancelPreparation();
      observer.disconnect();
      preparationObserver.disconnect();
      menuObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      release?.();
    };
  }, [reducedMotion, saveData]);

  const linkClass =
    "inline-flex min-h-11 items-center gap-3 text-sm underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-light";

  return (
    <footer
      aria-labelledby="footer-name"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg-deep px-page pt-section-sm text-text-light"
    >
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line-dark pb-5 text-xs tracking-[0.12em] uppercase">
        <p>{anku.slogan}</p>
        <Link to="/#main-content" className={linkClass}>
          Back to top <span aria-hidden="true">↑</span>
        </Link>
      </div>
      <div className="relative z-10 grid gap-8 pt-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-3 text-sm text-mist">
            A little quiet before you go.
          </p>
          <h2
            id="footer-name"
            className="font-display text-[clamp(4.5rem,12vw,12rem)] leading-[0.95] tracking-[-0.045em]"
          >
            {anku.name}<span className="text-mist">.</span>
          </h2>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-7 gap-y-1 md:max-w-64 md:justify-end"
        >
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className="pointer-events-none relative -mx-page mt-4 min-h-80 flex-1"
        aria-hidden="true"
        ref={host}
      >
        <div
          hidden={!reducedMotion && !saveData && !failed}
          className="absolute inset-0"
        >
          <svg
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path fill="#101b23" d="M0 180H1200V400H0Z" />
            {Array.from({ length: 32 }, (_, i) => {
              const y = 195 + i * 6.5;
              const width = 8 + i * 2.7;
              const x = 600 + Math.sin(i * 2.4) * (5 + i);
              return (
                <path
                  key={i}
                  d={`M${x - width} ${y}q${width} ${i % 2 ? 3 : -3} ${width * 2} 0`}
                  fill="none"
                  stroke="#b7c4c7"
                  strokeOpacity={0.35 - i * 0.007}
                  strokeWidth={1 + i * 0.03}
                />
              );
            })}
          </svg>
          {stars.map((star, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-mist"
              style={{
                left: `${star.x * 100}%`,
                top: `${star.y * 100}%`,
                width: star.size,
                height: star.size,
                opacity: star.brightness,
              }}
            />
          ))}
          <div className="absolute left-1/2 top-[20%] size-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,242,236,0.22)_0%,rgba(183,196,215,0.07)_35%,transparent_70%)]" />
          <div className="absolute left-1/2 top-[20%] size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </div>
      </div>

      <div className="relative z-10 -mx-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-bg-deep px-page py-5 text-xs text-mist">
        <p>© {new Date().getFullYear()} {anku.name}</p>
        <p>
          Designed & built by me, <Link to="/about">{anku.name}</Link>.
        </p>
        <p>
          Last updated{" "}
          <time dateTime={lastUpdated.date}>{lastUpdated.label}</time>
        </p>
        <Link to="/legal" className={linkClass}>
          Legal & credits
        </Link>
      </div>
    </footer>
  );
}
