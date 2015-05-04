import assign from 'object-assign'
import defined from 'defined'
import THREE from 'three'
const glslify = require('glslify')

const vert = glslify('./line.vert')
const frag = glslify('./line.frag')

export default function (opt) {
  return assign({
    transparent: true,
    uniforms: {
      thickness: { type: 'f', value: defined(opt.thickness, 0.1) },
      opacity: { type: 'f', value: defined(opt.opacity, 1.0) },
      dashed: { type: 'i', value: opt.dashed !== false ? 1 : 0  },
      dashSteps: { type: 'f', value: defined(opt.dashSteps, 0) },
      dashDistance: { type: 'f', value: defined(opt.dashDistance, 0.2) },
      dashSmooth: { type: 'f', value: 0.01 },
      diffuse: { type: 'c', value: new THREE.Color(defined(opt.diffuse, 0x0)) },
    },
    attributes: {
      lineMiter:  { type: 'f', value: [] },
      lineDistance: { type: 'f', value: [] },
      lineNormal: { type: 'v2', value: [] }
    },
    vertexShader: vert,
    fragmentShader: frag
  }, opt)
}