varying float lineU;
varying float lineV;
uniform float opacity;
uniform vec3 diffuse;
uniform float dashSteps;
uniform float dashSmooth;
uniform float dashDistance;
uniform int dashed;

void main() {
  if (dashed == 1) {
    float lineUMod = mod(lineU, 1.0/dashSteps) * dashSteps;
    float dist = dashDistance;
    float dash = smoothstep(dist, dist+dashSmooth, length(lineUMod-0.5));
    gl_FragColor = vec4(vec3(diffuse * dash), opacity * dash);
  } else {
    gl_FragColor = vec4(diffuse, opacity);
  }
}