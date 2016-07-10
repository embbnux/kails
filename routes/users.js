import Router from 'koa-router'
import users from '../controllers/users'

const router = Router()
router.get('/', users.index)

export default router
