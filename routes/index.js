import Router from 'koa-router'
import home from './home'
import users from './users'

const router = Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods)

export default router
