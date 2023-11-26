import fs from 'fs'

const TARGET_DIR = 'geojson/poland/cities'
const OUTPUT_FILE = 'geojson/poland/poland_cities_simplified.geojson'

const filenames = fs.readdirSync(TARGET_DIR)
const geojsonFeatures = filenames.flatMap((filename) => {
  console.log(`Reading ${filename}`)
  const file = fs.readFileSync(`${TARGET_DIR}/${filename}`, 'utf-8')

  const geojson = JSON.parse(file)

  return geojson.features
})

const featureCollection = {
  type: 'FeatureCollection',
  features: geojsonFeatures,
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(featureCollection, null, 2))
console.log('All done!')
