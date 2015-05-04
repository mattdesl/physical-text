import THREE from 'three'
global.THREE = THREE

import create from './lib/create-scene'

// import addSpinner from './lib/add-spinner'
import addPlane from './lib/add-plane'
import addText from './lib/add-text'

import loadAssets from './lib/load-preset'

const app = create()
const renderer = app.renderer
const gl = renderer.getContext()
const maxAnisotropy = renderer.getMaxAnisotropy()

// const spinner = addSpinner(app)
const plane = addPlane(app)
const text = addText(app, plane)

function showAsset(index) {
  plane.visible = false
  text.visible = false
  loadAssets(index, { anisotropy: maxAnisotropy })
    .then(preset => {
      plane.maps(preset.maps)
      plane.visible = true
      text.visible = true
      text.update(gl, preset)
    })
}

showAsset(0)
window.showAsset = showAsset