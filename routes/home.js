import Router from 'koa-router'
import home from '../controllers/home'

const router = Router()
router.get('/', home.index)
export default router
