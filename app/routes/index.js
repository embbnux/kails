import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import home from '../controllers/home';

const basename = path.basename(module.filename);
const router = Router();

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });
router.get('/', home.index);

export default router;
