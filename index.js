import THREE from 'three'
global.THREE = THREE

import create from './lib/create-scene'

// import addSpinner from './lib/add-spinner'
import addPlane from './lib/add-plane'
import addText from './lib/add-text'

import loadAssets, { count as assetCount } from './lib/load-preset'
import addEvents from './lib/dom'

const cameraDefault = new THREE.Vector3(0, 0, -0.3)
const origin = new THREE.Vector3()

const app = create()

const renderer = app.renderer
const gl = renderer.getContext()
const maxAnisotropy = renderer.getMaxAnisotropy()

// const spinner = addSpinner(app)
const plane = addPlane(app)
const text = addText(app, plane)

let current = 0
app.next = function(dir) {
  current += dir
  if (current > assetCount-1)
    current = 0
  if (current < 0)
    current = assetCount-1
  app.showAsset(current)
}

app.showAsset = function(index) {
  current = index
  plane.visible = false
  text.visible = false
  loadAssets(index, { anisotropy: maxAnisotropy })
    .then(preset => {
      plane.maps(preset.maps)
      plane.visible = true
      text.visible = true
      text.update(gl, preset)
      app.render()
    })
}

app.resetView = function() {
  app.camera.position.copy(cameraDefault)
  app.camera.lookAt(origin)
  app.controls.update()
}

app.reset = function() {
  app.resetView()
  app.showAsset(current)
}

app.showAsset(2)
addEvents(app)