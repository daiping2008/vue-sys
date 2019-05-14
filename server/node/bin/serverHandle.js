const handleUserRouter = require('../src/route/user')
const handleBlogRouter = require('../src/route/blog')
const serverHandle = (req, res) => {
  // 设置返回格式JSON
  res.setHeader('Content-type', 'application/json')
  const userRouter = handleUserRouter(req, res)
  if (userRouter) {
    res.end(JSON.stringify(userRouter))
    return
  }
  const blogRouter = handleBlogRouter(req, res)
  if (blogRouter) {
    res.end(JSON.stringify(blogRouter))
    return
  }

  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found')
  res.end()
}

module.exports = serverHandle
