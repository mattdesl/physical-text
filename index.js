import THREE from 'three'
global.THREE = THREE

import create from './lib/create-scene'
import fastclick from 'fastclick'
import addPlane from './lib/add-plane'
import addText from './lib/add-text'
import addEvents from './lib/add-events'

import loadAssets, { count as assetCount } from './lib/load-preset'

const $ = document.querySelector.bind(document)
const cameraDefault = new THREE.Vector3(0, 0, -0.3)
const origin = new THREE.Vector3()

const app = create()

const renderer = app.renderer
const gl = renderer.getContext()
const maxAnisotropy = renderer.getMaxAnisotropy()

const plane = addPlane(app)
const text = addText(app, plane)
const spinner = $('.icon.spinner')

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
  spinner.style.display = 'block'
  loadAssets(index, { anisotropy: maxAnisotropy })
    .then(preset => {
      plane.maps(preset.maps)
      text.update(gl, preset)
      app.render()
      spinner.style.display = 'none'
    })
}

app.resetView = function() {
  app.camera.position.copy(cameraDefault)
  app.camera.lookAt(origin)
  app.controls.target.copy(origin)
  app.controls.update()
}

app.reset = function() {
  app.resetView()
  app.showAsset(current)
}

app.showAsset(2)
fastclick(document.body)
addEvents(app)