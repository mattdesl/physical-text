import THREE from 'three'
import loop from 'raf-loop'

import assign from 'object-assign'
import domready from 'domready'
import fitter from 'canvas-fit'

const OrbitControls = require('three-orbit-controls')(THREE)

export default function(opt) {
  opt = assign({}, opt)

  const dpr = Math.min(2, window.devicePixelRatio)
  const canvas = opt.canvas || document.createElement('canvas')
  const fit = fitter(canvas, window, dpr)

  const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
  }, opt))

  const gl = renderer.getContext()

  const app = loop(draw)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(65, 1, 0.001, 100)
  const controls = new OrbitControls(camera, canvas)
  camera.position.copy(new THREE.Vector3(0, 0, -0.3))
  camera.lookAt(new THREE.Vector3())

  app.render = renderer.render.bind(renderer, scene, camera)

  //render each frame unless user wants to do it manually
  if (opt.rendering !== false)
    app.on('render', app.render.bind(app))

  assign(app, {
    renderer,
    scene,
    camera,
    controls,
    gl,
    canvas
  })

  window.addEventListener('resize', resize, false)
  renderer.setClearColor(new THREE.Color('rgb(10, 10, 10)'), 1)
  process.nextTick(resize)
  return app

  function draw() {
    app.emit('render')
  }

  function resize() {
    fit()
    const width = window.innerWidth
    const height = window.innerHeight
    const size = { width, height }

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    assign(app, size)
    app.emit('resize', size)
  }
}