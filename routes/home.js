import Router from 'koa-router'
import home from '../controllers/home'

const router = Router({
  prefix: '/'
})
router.get('/', home.index)
router.get('about', home.about)

// for require auto in index.js
module.exports = router
