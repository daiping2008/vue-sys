// get请求
// const http = require('http')
// const querystring = require('querystring')

// const server = http.createServer((req, res) => {
//   console.log(`method: ${req.method}`)
//   const url = req.url
//   console.log(`url: ${url}`)
//   req.query = querystring.parse(url.split('?')[1])
//   console.log('query: ', req.query)
//   res.end(JSON.stringify(req.query))
// })

// server.listen(8000)

// post请求
// const http = require('http')

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // 数据格式
//     console.log('content-type: ', req.headers['content-type'])
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       console.log('postData: ', postData)
//       res.end('hello world!')
//     })
//   }
// })

// server.listen(8000, () => {
//   console.log('success')
// })

// const http = require('http')

// const server = http.createServer((req, res) => {
//   const url = req.url
//   console.log('url: ', url)
//   const path = url.split('?')[0]
//   res.end(path)
// })

// server.listen(8000, () => {
//   console.log('ok')
// })

// 综合案例
// const http = require('http')
// const querystring = require('querystring')
// const server = http.createServer((req, res) => {
//   const method = req.method
//   const url = req.url
//   const path = url.split('?')[0]
//   const query = querystring.parse(url.split('?')[1])
//   res.setHeader('Content-type', 'application/json')
//   const resData = {
//     method,
//     url,
//     path,
//     query
//   }
//   if (method === 'GET') {
//     res.end(JSON.stringify(resData))
//   }
//   if (method === 'POST') {
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       resData.postData = postData
//       res.end(JSON.stringify(resData))
//     })
//   }
// })
// server.listen(8000)

const handleUserRouter = require('./src/route/user')
const handleBlogRouter = require('./src/route/blog')
const querystring = require('querystring')

// 获取POST请求数据
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let res = ''
    req.on('data', chunk => {
      res += chunk.toString()
    })
    req.on('end', () => {
      if (!res) {
        resolve({})
        return
      }
      resolve(JSON.parse(res))
    })
  })
}

const serverHandle = (req, res) => {
  // 设置返回格式JSON
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req)
    .then((postData) => {
      req.body = postData

      const userRouter = handleUserRouter(req, res)
      if (userRouter) {
        userRouter.then(result => {
          if (result) {
            res.end(JSON.stringify(result))
          }
        })
        return
      }

      const blogRouter = handleBlogRouter(req, res)
      if (blogRouter) {
        blogRouter.then(result => {
          if (result) {
            res.end(JSON.stringify(result))
          }
        })
        return
      }

      res.writeHead(404, { 'Content-type': 'text/plain' })
      res.write('404 Not Found')
      res.end()
    })
}

module.exports = serverHandle
