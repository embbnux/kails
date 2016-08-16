import Router from 'koa-router'
import articles from '../controllers/articles'

const router = Router()
router.get('/new', articles.checkLogin, articles.newArticle)
router.get('/:id', articles.show)
router.post('/', articles.checkLogin, articles.checkParamsBody, articles.create)

export default router
