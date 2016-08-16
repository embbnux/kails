import Router from 'koa-router'
import home from './home'
import users from './users'
import articles from './articles'

const router = Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods)
router.use('/articles', articles.routes(), articles.allowedMethods)

export default router
