import THREE from 'three'
import assign from 'object-assign'
import createShader from './shaders/text'
import random from 'randf'

const rndArray = (array) => array[Math.floor(Math.random()*array.length)]

export default function(app, plane) {
  var createTextGeom = require('three-bmfont-text')

  const material = new THREE.ShaderMaterial(createShader({
    // color: 0xffffff,
    map: new THREE.Texture(),
    depthTest: false,
    depthWrite: false,
    bgNormals: new THREE.Texture(),
    bgSpecular: new THREE.Texture(),
    bgDiffuse: new THREE.Texture(),
    // bgRepeat: paperOpt.repeat,
    smooth: 1 / 32, //the smooth value for SDF
    side: THREE.DoubleSide,
    transparent: true,
    color: '#000', //ffd735
    attributes: {
      bgUv: { type: 'v2', value: [] }
    }
  }))
  let textMesh = null
  let textGeom = null

  //scale down the text
  const textAnchor = new THREE.Object3D()
  // textAnchor.add(text)
  app.scene.add(textAnchor)

  return assign(textAnchor, {

    update(gl, preset) {
      const { font, maps, repeat } = preset

      const textStr = Array.isArray(preset.text) ? rndArray(preset.text) : preset.text
      const opts = assign({
        text: 'lorem ipsum',
        align: 'center',
        width: 200,
        color: 0xffffff
      }, preset, {
        font: font.data,
        text: textStr
      })

      material.uniforms.graffiti.value = preset.graffiti ? 1 : 0
      material.uniforms.shininess.value = preset.shininess
      material.uniforms.randomness.value = random(0.2, 0.8)
      material.uniforms.map.value = font.texture
      material.uniforms.bgRepeat.value.copy(repeat)
      material.uniforms.bgDiffuse.value = maps.diffuse
      material.uniforms.bgSpecular.value = maps.specular
      material.uniforms.bgNormals.value = maps.normal
      material.uniforms.color.value = new THREE.Color(opts.color)
      material.needsUpdate = true


      if (!textMesh)  {
        createText(opts)
      } else {
        textGeom.update(opts)
      }

      const layout = textGeom.layout
      textMesh.position.x = -layout.width / 2
      textMesh.position.y = layout.height / 2
      let scale = opts.scale * -0.005
      textAnchor.scale.set(scale, scale, scale)

      textAnchor.frustumCulled = false
      textMesh.frustumCulled = false
      plane.updateMatrixWorld(true)
      textAnchor.updateMatrixWorld(true)
      updateTextUVs(gl, textMesh, plane)
    }
  })

  function createText(data) {
    textGeom = createTextGeom(data)

    textMesh = new THREE.Mesh(textGeom, material)    
    textAnchor.add(textMesh)
  }

  function updateTextUVs(gl, text, background) {
    background.geometry.computeBoundingBox()
    const bounds = background.geometry.boundingBox

    const pos = text.geometry.attributes.position
    const count = pos.itemSize

    const uvArray = new Float32Array(pos.array.length)

    let bgUvs
    if (text.geometry.attributes.bgUv) {
      bgUvs = text.geometry.attributes.bgUv
      bgUvs.array = uvArray
    } else {
      bgUvs = new THREE.BufferAttribute(uvArray, 2)
      text.geometry.addAttribute('bgUv', bgUvs)
    }
    text.geometry.needsUpdate = true

    Object.keys(text.geometry.attributes).forEach(key => {
      const attrib = text.geometry.attributes[key]
      var bufferType = (key === 'index') ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER
      if (attrib.buffer) {
        gl.deleteBuffer(attrib.buffer)        
      }

      attrib.needsUpdate = true
      attrib.buffer = undefined
    })

    const tmp = new THREE.Vector3()
      
    const min = background.localToWorld(bounds.min.clone())
    const max = background.localToWorld(bounds.max.clone())
    min.z = 0
    max.z = 0

    for (var i=0; i<pos.array.length/count; i++) {
      const x = pos.array[i * count + 0]
      const y = pos.array[i * count + 1]
      tmp.set(x, y, 0)
      text.localToWorld(tmp)
      tmp.x = (tmp.x - min.x) / (max.x - min.x)
      tmp.y = (tmp.y - min.y) / (max.y - min.y)
      bgUvs.setXY(i, tmp.x, tmp.y)
    }
  }
}


