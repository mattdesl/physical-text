import THREE from 'three'
import clamp from 'clamp'
import assign from 'object-assign'

const easeInOut = require('eases/quad-in-out')
const ease = x => easeInOut(x*0.5+0.5)*2-1

import Viewer from './viewer'

export default function() {
  const app = Viewer({
    alpha: false,
    canvas: document.querySelector('#main-canvas'),
    preserveDrawingBuffer: false,
    antialias: true
  })

  const ambient = new THREE.AmbientLight('rgb(11,9,12)')
  app.scene.add(ambient)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 1, -4)
  app.scene.add(light)

  return app
}