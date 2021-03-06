const jwt = require('jsonwebtoken')
const config = require('../config')

const check = async (ctx, next) => {
  const url = ctx.request.url
  if (url === '/user/login' || url === '/user/register') await next()
  else {
    if (!ctx.request.headers['authorization']) return (ctx.body = { code: 10, msg: '请登录' })
    const token = ctx.request.headers['authorization'].split(' ')[1]
    const payload = jwt.verify(token, config.secret)
    const date = new Date().getTime()
    const { timeout } = payload
    if (date > parseInt(timeout)) return (ctx.body = { code: 10, msg: 'token过期' })
    await next()
  }
}

module.exports = check
