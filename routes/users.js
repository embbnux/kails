import Router from 'koa-router'
import users from '../controllers/users'

const router = Router()
router.get('/', users.index)
router.get('/sign_in', users.signIn)
export default router
