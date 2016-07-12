import config from '../config/config.js'
import manifest from '../public/assets/kails_manifest.json'

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
