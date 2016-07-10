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

export default {
  assetUrl: assetUrl
}
