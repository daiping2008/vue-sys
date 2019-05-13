const router = require('koa-router')()
const { md5 } = require('../utils/utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const UserModel = require('../db/models/user')
router.prefix('/user')

router.get('/', async ctx => {
  const res = await UserModel.find()
  console.log(res)
  ctx.body = { code: 0, data: res }
})

router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body)
  const { username, password, email, avatar, identify } = ctx.request.body
  try {
    const user = await UserModel.findOne({ email })
    console.log(user)
    if (user) {
      return (ctx.body = { code: 1, msg: '邮箱已经存在啦' })
    }

    const newUser = new UserModel({ username, email, avatar, identify, password: md5(password) })
    await newUser.save()
    return (ctx.body = { code: 0, data: { msg: '注册成功' } })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) return (ctx.body = { code: 1, msg: '用户不存在' })

    if (user.password !== md5(password)) return (ctx.body = { code: 1, msg: '密码错误' })
    const rule = { username: user.username, email: user.email, avatar: user.avatar, identify: user.identify, timeout: `${(new Date().getTime() + 60 * 60 * 60 * 24)}` }
    const token = jwt.sign(rule, config.secret)
    return (ctx.body = { code: 0, data: { token: `Bearer ${token}` } })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})

router.get('/getUser', async ctx => {
  console.log('1')
  ctx.body = { code: 0 }
})
module.exports = router
