import { GLSL_HEAD } from './common';

export const FLUID_WAVES_TOKENS = {
  u_canvas: '--sw-canvas',
  u_primary: '--sw-primary',
} as const;

/** Orange Perlin-style contour lines, warped locally by recent pointer movement. */
export const FLUID_WAVES_FRAGMENT = `${GLSL_HEAD}
uniform vec3 u_canvas;
uniform vec3 u_primary;

float hash3(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

float valueNoise(vec3 p) {
  vec3 cell = floor(p);
  vec3 local = fract(p);
  local = local * local * (3.0 - 2.0 * local);
  float c000 = hash3(cell + vec3(0.0, 0.0, 0.0));
  float c100 = hash3(cell + vec3(1.0, 0.0, 0.0));
  float c010 = hash3(cell + vec3(0.0, 1.0, 0.0));
  float c110 = hash3(cell + vec3(1.0, 1.0, 0.0));
  float c001 = hash3(cell + vec3(0.0, 0.0, 1.0));
  float c101 = hash3(cell + vec3(1.0, 0.0, 1.0));
  float c011 = hash3(cell + vec3(0.0, 1.0, 1.0));
  float c111 = hash3(cell + vec3(1.0, 1.0, 1.0));
  float z0 = mix(mix(mix(c000, c100, local.x), mix(c010, c110, local.x), local.y),
                 mix(mix(c001, c101, local.x), mix(c011, c111, local.x), local.y), local.z);
  return z0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y) * 2.2;
  float field = valueNoise(vec3(p, u_time * 0.045));

  float level = field * 18.0;
  float phase = fract(level);
  float distanceToContour = min(phase, 1.0 - phase);
  float contour = 1.0 - smoothstep(0.018, 0.055, distanceToContour);
  float nearestLevel = floor(level + 0.5);
  float majorContour = 1.0 - step(0.1, abs(mod(nearestLevel, 3.0)));
  float opacity = mix(0.52, 0.88, majorContour) * contour * u_level;

  gl_FragColor = vec4(mix(u_canvas, u_primary, opacity), 1.0);
}
`;
