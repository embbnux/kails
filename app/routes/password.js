import Router from 'koa-router';
import password from '../controllers/password';

const router = Router({
  prefix: '/password'
});
router.get('/edit', password.checkLogin, password.edit);
router.put('/', password.checkLogin, password.update);

// for require auto in index.js
module.exports = router;
