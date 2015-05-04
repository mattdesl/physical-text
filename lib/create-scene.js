import THREE from 'three'
import Touch from 'touch-position'
import clamp from 'clamp'
import assign from 'object-assign'

const easeInOut = require('eases/quad-in-out')
const touchPosition = Touch()
const ease = x => easeInOut(x*0.5+0.5)*2-1

import Viewer from './viewer'

export default function() {
  const app = Viewer({
    alpha: false,
    preserveDrawingBuffer: false,
    antialias: true
  })
  document.body.appendChild(app.canvas)
  assign(document.body.style, {
    background: '#000',
    overflow: 'hidden'
  })

  app.controls.noPan = true
  app.controls.noZoom = true
  // app.controls.noRotate = true

  const ambient = new THREE.AmbientLight('rgb(11,9,12)')
  app.scene.add(ambient)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 1, -4)
  app.scene.add(light)

  return app
}