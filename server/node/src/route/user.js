const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    return login({ username, password }).then(result => {
      if (result) {
        return new SuccessModel('登录成功')
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter
