import walks from './walks.json'
import photos from './photos.json'

const features = []
photos.features.forEach((feature) => {
  const result = Object.assign({}, feature.properties, {
    lat: feature.geometry && feature.geometry.coordinates[1],
    lng: feature.geometry && feature.geometry.coordinates[0]
  })
  features.push(result)
})

/* this avoids the memory leak */
/*
export const state = () => ({
  walks: walks,
  photos: features
})
*/

/* this triggers the memory leak */
export const state = () => ({
  walks: walks,
  photos: photos.features.map((feature) => {
    return Object.assign({}, feature.properties, {
      lat: feature.geometry && feature.geometry.coordinates[1],
      lng: feature.geometry && feature.geometry.coordinates[0]
    })
  })
  */
})
