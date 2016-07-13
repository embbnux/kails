import config from '../config/config.js'
import fs from 'fs'
import path from 'path'

let manifest = {}
let manifestPath = path.resolve(__dirname, '../', 'public', 'assets', 'kails_manifest.json')
if (fs.existsSync(manifestPath)) {
  manifest = require('../public/assets/kails_manifest.json')
}

console.log(fs.existsSync(manifestPath))
function assetUrl(asset) {
  const publicAsset = manifest[asset]
  let url = null
  if(publicAsset === undefined) {
    url = config.assetHost + '/' + asset
  }
  else {
    url = config.assetHost + '/assets/' + publicAsset
  }
  return url
}

function isActive(action, param) {
  let active = ''
  if(action == param){
    active = 'active'
  }
  return active
}

export default {
  assetUrl: assetUrl,
  isActive: isActive
}
