import fs from 'fs'
import simplify from '@turf/simplify'

const TARGET_DIR = 'geojson/poland/cities'
const OUTPUT_FILE = 'geojson/poland/poland_cities_simplified.geojson'

const filenames = fs.readdirSync(TARGET_DIR)
const geojsonFeatures = filenames.flatMap((filename) => {
  console.log(`Reading ${filename}`)

  const file = fs.readFileSync(`${TARGET_DIR}/${filename}`, 'utf-8')
  const geojson = JSON.parse(file)

  return geojson.features
})

const simplifiedFeatures = geojsonFeatures.map((feature) => {
  const slimedFeature = {
    ...feature,
    properties: {
      name: feature.properties.name,
    },
  }

  return simplify(slimedFeature, { highQuality: true, tolerance: 0.0005 })
})

const featureCollection = {
  type: 'FeatureCollection',
  features: simplifiedFeatures,
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(featureCollection))
console.log('All done!')
