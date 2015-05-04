import THREE from 'three'
import assign from 'object-assign'

export default function(app) {
  const size = 1
  const planeGeo = new THREE.PlaneGeometry(size, size)
  const planeMat = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(),
    normalMap: new THREE.Texture(),
    shininess: 10,
    specularMap: new THREE.Texture(),
    // side: THREE.DoubleSide
  })
  const plane = new THREE.Mesh(planeGeo, planeMat)
  planeGeo.computeBoundingBox()
  plane.geometry = planeGeo
  plane.rotation.y = -Math.PI
  plane.position.z = 0.0005 //avoid z-fighting
  app.scene.add(plane)

  return assign(plane, {
    maps({ diffuse, normal, specular }) {
      planeMat.map = diffuse
      planeMat.normalMap = normal
      planeMat.specularMap = specular
      planeMat.needsUpdate = true
    }
  })
}