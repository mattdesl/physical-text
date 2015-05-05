// #pragma glslify: absorb = require('./absorb')

// //writing on paper
// float ink(float sdf, vec2 uv) {
//   float alpha = 0.0;
//   alpha += absorb(sdf, uv, 80.0, 0.02) * 0.1;
//   alpha += absorb(sdf, uv, 50.0, 0.02) * 0.1;
//   alpha += absorb(sdf, uv, 500.0, 0.05) * 0.2;
//   alpha += absorb(sdf, uv, 1000.0, 0.05) * 0.2;
//   alpha += absorb(sdf, uv, 3000.0, 0.1) * 0.2;
//   alpha += absorb(sdf, uv, 1000.0, 0.3) * 0.15;
//   return alpha;
// }

// float ink2(float sdf, vec2 uv) {
//   float alpha = 0.0;
//   alpha += absorb(sdf, uv, 80.0, 0.05) * 0.1;
//   alpha += absorb(sdf, uv, 50.0, 0.05) * 0.1;
//   alpha += absorb(sdf, uv, 4000.0, 0.02) * 0.2;
//   alpha += absorb(sdf, uv, 1000.0, 0.01) * 0.2;
//   alpha += absorb(sdf, uv, 3500.0, 0.07) * 0.1;
//   alpha += absorb(sdf, uv, 2500.0, 0.03) * 0.1;
//   alpha += absorb(sdf, uv, 1500.0, 0.02) * 0.1;
//   return alpha;
// }

// //more splatter
// float graffiti(float sdf, vec2 uv) {
//   float alpha = 0.0;
//   alpha += absorb(sdf, uv, 600.0, 0.1) * 0.2;
//   alpha += absorb(sdf, uv, 300.0, 0.1) * 0.2;
//   alpha += absorb(sdf, uv, 20.0, 0.05) * 0.2;
//   alpha += absorb(sdf, uv, 400.0, 0.05) * 0.2;
//   alpha += absorb(sdf, uv, 100.0, 0.2) * 0.2;
//   return alpha;
// }

// float selectInk(int g, float sdf, vec2 uv) {
//   return absorb(sdf, uv, 1.0, 0.0);
//   // if (g == 1) {
//   //   return graffiti(sdf, uv);
//   // }
//   // else {
//   //   return ink(sdf, uv);
//   // }
// }

#pragma glslify: noise2 = require('glsl-noise/simplex/2d')
#pragma glslify: aastep = require('glsl-aastep')

float selectInk(int g, float sdf, vec2 uv) {
  float alpha = 0.0;
  alpha += aastep(0.5, sdf + noise2(uv * 1000.0) * 0.1) * 0.3;
  alpha += aastep(0.5, sdf + noise2(uv * 50.0) * 0.2) * 0.3;
  alpha += aastep(0.5, sdf + noise2(uv * 500.0) * 0.2) * 0.3;
  return alpha;
}

#pragma glslify: export(selectInk)