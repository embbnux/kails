const fs = require('fs');
const router = require('koa-router')();

const routes = () => {
	const files = fs.readdirSync(__dirname);
	const indexNumber = files.indexOf('index.js');
	files.splice(indexNumber, 1);
	return files.map(file => require('./' + file));
}

routes().forEach((route) => {
  router.use(route.routes(), route.allowedMethods());
})

export default router
