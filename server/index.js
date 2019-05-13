const Koa = require('koa')
const koaBody = require('koa-body')
const user = require('./route/user')
const profile = require('./route/profile')
const check = require('./utils/check')
const { connect } = require('./db')
connect()

const app = new Koa()
app.use(check)
app.use(koaBody())
app.use(user.routes()).use(user.allowedMethods())
app.use(profile.routes()).use(profile.allowedMethods())
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`)
})
