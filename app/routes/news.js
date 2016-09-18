import Router from 'koa-router';
import news from '../controllers/news';

const router = Router({
  prefix: '/news'
});

router.get('/', news.index);

// for require auto in index.js
module.exports = router;
