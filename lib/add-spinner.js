// not used in this demo...
import THREE from 'three'
import Line from 'three-line-2d'
import arcTo from 'arc-to'
import TweenTicker from 'tween-ticker'
import assign from 'object-assign'
import createShader from './shaders/line'
const createLine = Line(THREE)
const easeOut = require('eases/expo-out')

export default function(app, opt) {
  const polyline = arcTo(0, 0, 0.5, 0, Math.PI*2, false, 64)
  const geom = createLine(polyline, { closed: true, distances: true })
  const style = {
    thickness: 0,
    opacity: 0,
    dashSteps: 0,
    dashDistance: 0.4,
    side: THREE.DoubleSide,
    diffuse: 0xffffff,
  }

  const mat = new THREE.ShaderMaterial(createShader(style))
  const uniforms = mat.uniforms

  const mesh = new THREE.Mesh(geom, mat)
  mesh.scale.multiplyScalar(0.01)
  mesh.position.z = -0.05
  app.scene.add(mesh)

  const ticker = TweenTicker()
  
  function to(prop, opt) {
    ticker.to(prop, assign({ ease: easeOut, duration: 1 }, opt))
  }

  function show(opt={ diffuse: 0xffffff }) {
    uniforms.diffuse.value = new THREE.Color(opt.diffuse)
    to(uniforms.opacity, { value: 1 })
    to(uniforms.dashDistance, { value: 0.2 })
    to(uniforms.dashSteps, { value: 3, duration: 2 })
    to(uniforms.thickness, { value: 0.05, duration: 3 })
  }

  function hide() {
    to(uniforms.dashDistance, { value: style.dashDistance, duration: 3 })
    to(uniforms.dashSteps, { value: style.dashSteps, duration: 2 })
    to([uniforms.opacity, uniforms.thickness], { value: 0 })
  }

  app.on('tick', dt => {
    mesh.rotation.z -= dt * 0.001
    ticker.tick(dt/1000)
  })

  return assign(mesh, { show, hide })
}