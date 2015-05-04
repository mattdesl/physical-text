import THREE from 'three'
import OrbitView from 'three-orbit-viewer'
import Touch from 'touch-position'
import clamp from 'clamp'

const easeInOut = require('eases/quad-in-out')
const touchPosition = Touch()
const createOrbitView = OrbitView(THREE)
const ease = x => easeInOut(x*0.5+0.5)*2-1

import Viewer from './viewer'

export default function() {
  const app = createOrbitView({
    clearColor: 'rgb(10, 10, 10)',
    clearAlpha: 1.0,
    near: 0.001,
    fov: 55,
    position: new THREE.Vector3(0, 0, -0.3)
  })

  app.controls.noPan = true
  // app.controls.noRotate = true
  // app.controls.zoomSpeed = 0.5
  app.controls.maxDistance = 0.7
  app.controls.minDistance = 0.0

  const ambient = new THREE.AmbientLight('rgb(11,9,12)')
  app.scene.add(ambient)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 1, -4)
  app.scene.add(light)

  // const origin = new THREE.Vector3()
  // const z = -0.2
  // const r = 0.5
  // app.on('tick', function() {
  //   let [ x, y ] = touchPosition
  //   x = x / window.innerWidth
  //   y = y / window.innerHeight

  //   const dx = x - 0.5, dy = y - 0.5
  //   const len = Math.sqrt(dx*dx + dy*dy)

  //   x = x * 2 - 1
  //   y = y * 2 - 1
  //   app.camera.position.x = (len * r * x)
  //   app.camera.position.y = (len * r * y)
  //   app.camera.lookAt(origin)
  // })

  return app
}