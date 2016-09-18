import config from '../../config/config.js';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

let manifest = {};
let manifestPath = path.resolve(__dirname, '../', '../', 'public', 'assets', 'kails_manifest.json');
if (fs.existsSync(manifestPath)) {
  manifest = require('../../public/assets/kails_manifest.json');
}

exports.assetUrl = function (asset) {
  const publicAsset = manifest[asset];
  let url = null;
  if(publicAsset === undefined) {
    url = config.assetHost + '/' + asset;
  }
  else {
    url = config.assetHost + '/assets/' + publicAsset;
  }
  return url;
};

exports.isActive = function (action, param) {
  let active = '';
  if(action == param){
    active = 'active';
  }
  return active;
};

// moment.locale('zh-cn')

exports.timeAgo = function (date) {
  date = moment(date);
  return date.fromNow();
};

exports.formatDate = function (date) {
  date = moment(date);
  return date.format('YYYY-MM-DD HH:mm');
};
