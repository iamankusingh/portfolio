// Water shader for the hero scene. The water is rendered using a custom shader that simulates waves and reflections. The shader uses a vertex shader to displace the water surface and a fragment shader to calculate the color based on the view direction, normal, and sun position. The water detail can be toggled on or off for performance reasons.
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { ShaderMaterial } from "three";

// Return height and its x/z slopes. Long swells fit even the low-tier grid;
// short ripples affect fragment normals rather than undersampled vertices.
const waves = /* glsl */ `
  uniform float uTime;

  vec3 wave(vec2 point, vec2 direction, float wavelength, float speed, float amplitude) {
    vec2 frequency = normalize(direction) * (6.28318530718 / wavelength);
    float phase = dot(frequency, point) + uTime * speed;
    return vec3(sin(phase) * amplitude, cos(phase) * amplitude * frequency);
  }

  vec3 swell(vec2 point) {
    return wave(point, vec2(1.0, 0.32), 80.0, 0.34, 0.13)
      + wave(point, vec2(-0.38, 1.0), 55.0, 0.48, 0.075)
      + wave(point, vec2(0.72, -1.0), 38.0, 0.62, 0.035);
  }
`;

const vertexShader = /* glsl */ `
  ${waves}
  varying vec3 vWorld;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    world.y += swell(world.xz).x;
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  ${waves}
  uniform float uDetail;
  varying vec3 vWorld;

  vec3 ripple(vec2 point, vec2 direction, float wavelength, float speed, float amplitude) {
    float phase = dot(normalize(direction), point) * (6.28318530718 / wavelength) + uTime * speed;
    // Fade waves smaller than a few pixels before they become horizon stripes.
    float resolved = 1.0 - smoothstep(0.3, 1.5, fwidth(phase));
    return wave(point, direction, wavelength, speed, amplitude) * resolved;
  }

  void main() {
    float distanceToCamera = length(cameraPosition - vWorld);
    vec3 surface = swell(vWorld.xz);
    if (uDetail > 0.5) {
      vec3 ripples = ripple(vWorld.xz, vec2(-1.0, -0.21), 5.2, 0.88, 0.022)
        + ripple(vWorld.xz, vec2(0.18, 1.0), 3.3, 1.15, 0.012);
      surface += ripples * (1.0 - smoothstep(35.0, 120.0, distanceToCamera));
    }
    // Analytic slopes stay continuous across triangles instead of exposing the grid.
    vec3 normal = normalize(vec3(-surface.y, 1.0, -surface.z));
    vec3 viewDirection = normalize(cameraPosition - vWorld);
    float facing = clamp(dot(normal, viewDirection), 0.0, 1.0);
    float fresnel = 0.02 + 0.98 * pow(1.0 - facing, 5.0);

    vec3 reflected = reflect(-viewDirection, normal);
    float skyAmount = smoothstep(-0.2, 0.9, reflected.y);
    vec3 horizon = vec3(0.30, 0.43, 0.46);
    vec3 sky = mix(horizon, vec3(0.58, 0.68, 0.67), skyAmount);
    vec3 deepWater = vec3(0.015, 0.075, 0.105);
    vec3 surfaceWater = vec3(0.035, 0.18, 0.20);
    vec3 color = mix(deepWater, surfaceWater, 0.36 + normal.y * 0.34);
    color = mix(color, sky, fresnel * 0.78);

    vec3 sunDirection = normalize(vec3(0.0, 30.0, -52.0) - vWorld);
    vec3 halfVector = normalize(sunDirection + viewDirection);
    float sunSpecular = pow(max(dot(normal, halfVector), 0.0), mix(65.0, 110.0, uDetail));
    color += vec3(1.0, 0.72, 0.34) * sunSpecular * 1.1;

    float crest = smoothstep(0.1, 0.2, surface.x) * (1.0 - facing) * uDetail;
    color += vec3(0.32, 0.43, 0.43) * crest * 0.08;
    float haze = smoothstep(70.0, 210.0, distanceToCamera);
    color = mix(color, horizon, haze * 0.82);

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function Water({
  active,
  detailed,
}: {
  active: boolean;
  detailed: boolean;
}) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDetail: { value: 1 },
    }),
    [],
  );
  useFrame((_, delta) => {
    if (!material.current) return;
    material.current.uniforms.uDetail.value = detailed ? 1 : 0;
    if (active) material.current.uniforms.uTime.value += Math.min(delta, 0.05);
  });
  const segments = detailed ? 128 : 64;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, -45]}>
      <planeGeometry args={[600, 600, segments, segments]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
