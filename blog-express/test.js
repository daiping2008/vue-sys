const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('请求开始... ' + req.url)
  next()
})

app.use((req, res, next) => {
  // 设置cookie
  req.cookie = {
    userid: '123'
  }
  next()
})

app.use((req, res, next) => {
  req.body = {
    username: 'susan',
    password: 123
  }
  next()
})

app.use('/api', (req, res, next) => {
  console.log('进入api')
  next()
})

const check = (req, res, next) => {
  console.log('进入验证代码')
  // 验证成功
  // next()

  // 验证失败
  res.json({
    code: 1,
    msg: '验证失败'
  })
}

app.get('/api', check, (req, res, next) => {
  console.log('进入get api')
  res.json({
    code: 0,
    data: req.cookie
  })
})

app.post('/api', (req, res, next) => {
  console.log('进入post api')
  res.json({
    code: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理 404')
  res.json({
    code: 1,
    msg: '404 not found'
  })
})

app.listen(3000, ()=>{
  console.log('ok')
})
