import { Promise, promisify } from './'
import loadTextureAsync from './load-texture'

export default function(path, opt) {
  const names = ['diffuse', 'normals', 'spec']
  const urls = names.map(name => `${path}-${name}.png`)
  return Promise.all(urls.map(url => {
    return loadTextureAsync(url, opt)
  })).then(results => {
    const [diffuse, normal, specular] = results
    return {
      diffuse, normal, specular
    }
  })
}