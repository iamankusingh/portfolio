// Original GLSL: semi-Lagrangian advection, Jacobi pressure projection,
// and vorticity confinement. Manual bilinear sampling avoids float-filter extensions.
export const vertexShader = `#version 300 es
precision highp float;
out vec2 uv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const header = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 uv;
out vec4 result;
uniform sampler2D source;
uniform vec2 texel;
vec4 sampleLinear(sampler2D field, vec2 p) {
  vec2 size = vec2(textureSize(field, 0));
  vec2 pos = p * size - 0.5;
  vec2 base = (floor(pos) + 0.5) / size;
  vec2 f = fract(pos);
  vec2 stepSize = 1.0 / size;
  return mix(mix(texture(field, base), texture(field, base + vec2(stepSize.x, 0)), f.x),
    mix(texture(field, base + vec2(0, stepSize.y)), texture(field, base + stepSize), f.x), f.y);
}
`;

export const fragments = {
  copy: `${header}
void main() { result = sampleLinear(source, uv); }`,
  splat: `${header}
uniform vec2 point;
uniform vec3 color;
uniform float radius;
uniform float aspect;
uniform float ink;
void main() {
  vec2 p = uv - point;
  p.x *= aspect;
  float weight = exp(-dot(p, p) / (radius * radius));
  vec3 current = texture(source, uv).rgb;
  vec3 added = current + color * weight;
  result = vec4(ink > 0.5 ? min(added, vec3(3.0)) : clamp(added, vec3(-600), vec3(600)), 1);
}`,
  advect: `${header}
uniform sampler2D velocity;
uniform float dt;
uniform float decay;
void main() {
  vec2 flow = sampleLinear(velocity, uv).xy;
  result = sampleLinear(source, uv - dt * flow * texel) / (1.0 + decay * dt);
}`,
  curl: `${header}
void main() {
  float left = texture(source, uv - vec2(texel.x, 0)).y;
  float right = texture(source, uv + vec2(texel.x, 0)).y;
  float bottom = texture(source, uv - vec2(0, texel.y)).x;
  float top = texture(source, uv + vec2(0, texel.y)).x;
  result = vec4(0.5 * (right - left - top + bottom), 0, 0, 1);
}`,
  vorticity: `${header}
uniform sampler2D curls;
uniform float strength;
uniform float dt;
void main() {
  float left = texture(curls, uv - vec2(texel.x, 0)).x;
  float right = texture(curls, uv + vec2(texel.x, 0)).x;
  float bottom = texture(curls, uv - vec2(0, texel.y)).x;
  float top = texture(curls, uv + vec2(0, texel.y)).x;
  float center = texture(curls, uv).x;
  vec2 force = 0.5 * vec2(abs(top) - abs(bottom), abs(left) - abs(right));
  force *= strength * center / (length(force) + 0.0001);
  result = vec4(clamp(texture(source, uv).xy + force * dt, vec2(-600), vec2(600)), 0, 1);
}`,
  divergence: `${header}
void main() {
  vec2 center = texture(source, uv).xy;
  float left = uv.x < texel.x ? -center.x : texture(source, uv - vec2(texel.x, 0)).x;
  float right = uv.x > 1.0 - texel.x ? -center.x : texture(source, uv + vec2(texel.x, 0)).x;
  float bottom = uv.y < texel.y ? -center.y : texture(source, uv - vec2(0, texel.y)).y;
  float top = uv.y > 1.0 - texel.y ? -center.y : texture(source, uv + vec2(0, texel.y)).y;
  result = vec4(0.5 * (right - left + top - bottom), 0, 0, 1);
}`,
  pressure: `${header}
uniform sampler2D divergence;
void main() {
  float sum = texture(source, uv - vec2(texel.x, 0)).x + texture(source, uv + vec2(texel.x, 0)).x
    + texture(source, uv - vec2(0, texel.y)).x + texture(source, uv + vec2(0, texel.y)).x;
  result = vec4((sum - texture(divergence, uv).x) * 0.25, 0, 0, 1);
}`,
  project: `${header}
uniform sampler2D pressure;
void main() {
  vec2 gradient = vec2(texture(pressure, uv + vec2(texel.x, 0)).x - texture(pressure, uv - vec2(texel.x, 0)).x,
    texture(pressure, uv + vec2(0, texel.y)).x - texture(pressure, uv - vec2(0, texel.y)).x);
  vec2 velocity = texture(source, uv).xy - 0.5 * gradient;
  if (uv.x < texel.x || uv.x > 1.0 - texel.x) velocity.x = 0.0;
  if (uv.y < texel.y || uv.y > 1.0 - texel.y) velocity.y = 0.0;
  result = vec4(velocity, 0, 1);
}`,
  diffuse: `${header}
uniform float amount;
void main() {
  vec4 neighbors = texture(source, uv - vec2(texel.x, 0)) + texture(source, uv + vec2(texel.x, 0))
    + texture(source, uv - vec2(0, texel.y)) + texture(source, uv + vec2(0, texel.y));
  result = mix(texture(source, uv), neighbors * 0.25, amount);
}`,
  display: `${header}
uniform float textureMode;
uniform float intensity;
uniform vec2 resolution;
float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec3 ink = max(sampleLinear(source, uv).rgb, vec3(0));
  vec3 color = vec3(0.027, 0.035, 0.043) + (1.0 - exp(-ink * 1.25)) * 0.95;
  vec2 pixel = uv * resolution;
  float grain = noise(floor(pixel)) - 0.5;
  float paper = grain * 0.55 + (noise(floor(pixel / 3.0)) - 0.5) * 0.3
    + sin(pixel.x * 1.9 + sin(pixel.y * 0.07)) * 0.12;
  if (textureMode > 0.5) color += (textureMode > 1.5 ? paper : grain) * intensity * 0.18;
  result = vec4(clamp(color, 0.0, 1.0), 1);
}`,
};
