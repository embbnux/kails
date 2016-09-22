import Router from 'koa-router';
import home from '../controllers/home';

const router = Router({
  prefix: '/'
});
router.get('about', home.about);
router.get('/', home.index);

// for require auto in index.js
module.exports = router;
