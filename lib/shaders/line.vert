uniform float thickness;
attribute float lineMiter;
attribute vec2 lineNormal;
attribute float lineDistance;
varying float lineU;
varying float lineV;
void main() {
  lineV = sign(lineMiter);
  lineU = lineDistance;
  vec3 pointPos = position.xyz + vec3(lineNormal * thickness/2.0 * lineMiter, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pointPos, 1.0 );
}