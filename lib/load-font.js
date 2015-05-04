import { Promise, promisify } from './'
import loadBMFont from 'load-bmfont'
import loadTextureAsync from './load-texture'

const loadBMFontAsync = promisify(loadBMFont)

export default function(path, opt) {
  return Promise.all([
    loadBMFontAsync(`${path}.fnt`),
    loadTextureAsync(`${path}.png`, opt)
  ]).then(results => {
    const [data, texture] = results
    return {
      data, texture
    }
  })
}