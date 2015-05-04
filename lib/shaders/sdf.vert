// varying vec2 bgUv;
varying vec2 vUv;
varying vec2 vBgUv;
varying vec3 vViewPosition;

attribute vec2 bgUv;
uniform vec2 bgRepeat;

void main() {
  vUv = uv;
  vBgUv = bgUv * bgRepeat;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;

  gl_Position = projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);

  // mat4 modelxz = modelViewMatrix;
  // vec4 projected = modelxz * vec4(position.xy, 0.0, 1.0);
  // bgUv = projected.xy;
}