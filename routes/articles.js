import Router from 'koa-router'
import articles from '../controllers/articles'

const router = Router()
router.get('/new', articles.checkLogin, articles.newArticle)
router.get('/:id', articles.show)
router.put('/:id', articles.checkLogin, articles.checkArticleOwner, articles.checkParamsBody, articles.update)
router.get('/:id/edit', articles.checkLogin, articles.checkArticleOwner, articles.edit)
router.post('/', articles.checkLogin, articles.checkParamsBody, articles.create)

export default router
