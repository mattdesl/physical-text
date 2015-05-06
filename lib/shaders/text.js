import assign from 'object-assign'

var glslify = require('glslify')

export default function(opt) {
  opt = opt||{}
  var opacity = typeof opt.opacity === 'number' ? opt.opacity : 1
  var alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.06
  var smooth = typeof opt.smooth === 'number' ? opt.smooth : 1/16
  var specular = typeof opt.specular === 'undefined' ? 0x111111 : opt.specular

  return assign({
    uniforms: assign({}, THREE.UniformsLib.lights, {
      normalScale: { type: 'f', value: 1 },
      bgRepeat: { type: 'v2', value: opt.bgRepeat || new THREE.Vector2(1,1) },
      bgDiffuse: { type: 't', value: opt.bgDiffuse || new THREE.Texture() },
      bgNormals: { type: 't', value: opt.bgNormals || new THREE.Texture() },
      bgSpecular: { type: 't', value: opt.bgSpecular || new THREE.Texture() },
      opacity: { type: 'f', value: opacity },
      smooth: { type: 'f', value: smooth },
      shininess: { type: 'f', value: 140 },
      randomness: { type: 'f', value: 0 },
      graffiti: { type: 'i', value: 0 },
      specularColor: { type: 'c', value: new THREE.Color(specular) },
      map: { type: 't', value: opt.map || new THREE.Texture() },
      color: { type: 'c', value: new THREE.Color(opt.color) }
    }),
    lights: true,
    vertexShader: glslify('./sdf.vert'),
    fragmentShader: glslify('./sdf.frag'),
    defines: {
      "USE_MAP": "",
      "ALPHATEST": Number(alphaTest || 0).toFixed(1)
    }
  }, opt)
}