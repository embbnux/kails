import Router from 'koa-router';
import passwords from '../controllers/passwords';

const router = Router({
  prefix: '/passwords'
});
router.get('/edit', passwords.checkLogin, passwords.edit);
router.put('/', passwords.checkLogin, passwords.update);

// for require auto in index.js
module.exports = router;
