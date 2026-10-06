import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Matrix4, PlaneGeometry, ShaderMaterial, Vector3 } from "three";
import type { Group } from "three";
import { Reflector } from "three/addons/objects/Reflector.js";

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
    // Keep larger waves clear of the island shoreline.
    float envelope = smoothstep(13.0, 24.0, radius)
      * (1.0 - smoothstep(100.0, 220.0, radius));
    vec3 displacement = gerstner(point, vec2(1.0, 0.32), 21.0, 0.42, 0.9)
      + gerstner(point, vec2(-0.38, 1.0), 13.0, 0.25, 1.15)
      + gerstner(point, vec2(0.72, -1.0), 8.0, 0.14, 1.4)
      + gerstner(point, vec2(-1.0, -0.21), 5.4, 0.065, 1.8);
    return vec3(point.x, -0.15, point.y) + displacement * envelope;
  }

  void main() {
    vec4 rest = modelMatrix * vec4(position, 1.0);
    vec3 world = oceanPoint(rest.xz);
    // Tangents include horizontal wave travel and shoreline attenuation.
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
  uniform vec3 uSunPosition;
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

    vec2 reflectionUv = vReflection.xy / vReflection.w;
    reflectionUv = clamp(reflectionUv + normal.xz * 0.024, vec2(0.002), vec2(0.998));
    vec2 blur = vec2(0.0015);
    vec3 reflection = texture2D(tDiffuse, reflectionUv).rgb * 0.5;
    reflection += texture2D(tDiffuse, reflectionUv + blur).rgb * 0.25;
    reflection += texture2D(tDiffuse, reflectionUv - blur).rgb * 0.25;

    float shore = 1.0 - smoothstep(14.0, 32.0, length(vWorld.xz - vec2(0.0, -8.0)));
    vec3 water = mix(vec3(0.012, 0.075, 0.10), vec3(0.035, 0.24, 0.24), shore);
    water *= 0.85 + 0.25 * normal.y + vHeight * 0.14;
    vec3 color = mix(water, reflection, 0.22 + fresnel * 0.68);

    vec3 sunDirection = normalize(uSunPosition - vWorld);
    vec3 halfVector = normalize(sunDirection + viewDirection);
    float highlight = pow(max(dot(normal, halfVector), 0.0), 170.0);
    color += vec3(1.0, 0.83, 0.59) * highlight * 0.6;
    float foam = smoothstep(0.52, 0.76, vHeight) * smoothstep(0.06, 0.18, 1.0 - normal.y);
    color = mix(color, vec3(0.65, 0.78, 0.75), foam * 0.3);
    float haze = smoothstep(100.0, 230.0, length(cameraPosition - vWorld));
    color = mix(color, vec3(0.28, 0.38, 0.41), haze);

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function Water({
  active,
  sunPosition,
}: {
  active: boolean;
  sunPosition: Vector3;
}) {
  const host = useRef<Group>(null);
  const surface = useRef<Reflector | null>(null);
  const elapsed = useRef(0);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const group = host.current;
    if (!group) return;
    const segments = 256;
    const geometry = new PlaneGeometry(600, 600, segments, segments);
    const positions = geometry.attributes.position;
    // Concentrate vertices around the island instead of spending them at the horizon.
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i) / 300;
      const y = positions.getY(i) / 300;
      positions.setXY(
        i,
        Math.sign(x) * Math.pow(Math.abs(x), 1.6) * 300,
        Math.sign(y) * Math.pow(Math.abs(y), 1.6) * 300,
      );
    }
    positions.needsUpdate = true;
    const resolution = 768;
    const ocean = new Reflector(geometry, {
      textureWidth: resolution,
      textureHeight: resolution,
      clipBias: 0.003,
      multisample: 0,
      shader: {
        name: "GerstnerOcean",
        uniforms: {
          tDiffuse: { value: null },
          textureMatrix: { value: new Matrix4() },
          color: { value: new Vector3(1, 1, 1) },
          uTime: { value: elapsed.current },
          uSunPosition: { value: sunPosition },
        },
        vertexShader,
        fragmentShader,
      },
    });
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.set(0, -0.15, -8);
    ocean.frustumCulled = false;
    // Reflector clones uniforms: reconnect the shared animated sun vector.
    if (ocean.material instanceof ShaderMaterial)
      ocean.material.uniforms.uSunPosition.value = sunPosition;
    surface.current = ocean;
    group.add(ocean);
    invalidate();
    return () => {
      surface.current = null;
      group.remove(ocean);
      ocean.dispose();
      geometry.dispose();
    };
  }, [sunPosition, invalidate]);

  useFrame((_, delta) => {
    if (active) elapsed.current += Math.min(delta, 0.05);
    const ocean = surface.current;
    if (ocean) {
      const material = ocean.material;
      if (material instanceof ShaderMaterial)
        material.uniforms.uTime.value = elapsed.current;
    }
  });

  return <group ref={host} />;
}
