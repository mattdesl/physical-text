#pragma glslify: noise2 = require('glsl-noise/simplex/2d')
#pragma glslify: aastep = require('glsl-aastep')

float absorb(float sdf, vec2 uv, float scale, float falloff) {
  float distort = sdf + noise2(uv * scale) * falloff;
  return aastep(mix(0.5, 1.0, 0.0), distort);
}

#pragma glslify: export(absorb)