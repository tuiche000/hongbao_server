const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const cors = require('koa-cors') //跨域
const bodyParser = require('koa-bodyparser') //解析post数据
const db = require('./libs/database') //mysql
const config = require('./config')

const app = new Koa()
app.listen(config.port)
// 使用中间件
app.use(cors())
app.use(static(__dirname + '/static'))
app.use(bodyParser())
app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

const router = new Router()
router.post('/user/login', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    msg: 'ok',
    data: {
      userId: '1',
      userName: '管理员'
    },
    status: 200
  }
})
app.use(router.routes())
