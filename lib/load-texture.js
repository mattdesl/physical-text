import THREE from 'three'
import assign from 'object-assign'
import { Promise } from './'

export default function(path, opt) {
  return new Promise((resolve, reject) => {
    THREE.ImageUtils.loadTexture(path, undefined,
      tex => {
        assign(tex, opt)
        resolve(tex)
      },
      () => {
        reject(new Error`could not load image ${path}`)
      })
  })
}