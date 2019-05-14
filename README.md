##nodejs

#模块化
定义
```js
function add(a, b){ return a+b}
module.exports = add
```
引用
```js
const add = require('./a)
```
#node的debug

#服务稳定性
server端可能会遭受各种恶意攻击和误操作
单个客户端可以意外挂掉，但是服务器不能
进程守候
#考虑CPU和内存
客户端独占一个浏览器，内存和CPU都不是问题
server端要承载很多请求，CPU和内存都是稀缺资源
steam写日志，使用redis存session
#日志记录
前端也会参与写日志，但只是日志的发起方，不关心后续
server端要记录日志，存储日志，分析日志，前端不关心
#安全
server端要随时准备接受各种恶意攻击，前端则少很多
如：越权操作，数据库攻击等
预防xss攻击和sql注入
#集群和服务拆分
产品发展速度快，流量可能会迅速增加

#目标
开发一个博客系统，具有博客的基本功能
只开发server端，不关心前端
#技术方案

#http
DNS解析， 建立TCP连接，发生http请求
server接收到http请求，处理，并返回
客户端接收到返回数据，处理数据

```js
const http = require('http')
const server = http.createServer((req, res) => {
  res.end('hello world')
})
server.listen(8000)
```
#nodejs处理get请求
参数获取
```js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log(`method: ${req.method}`)
  const url = req.url
  console.log(`url: ${url}`)
  req.query = querystring.parse(url.split('?')[1])
  console.log('query: ', req.query)
  res.end(JSON.stringify(req.query))
})

server.listen(8000)
```
#nodejs处理postqingq
```js
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // 数据格式
    console.log('content-type: ', req.headers['content-type'])
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData: ', postData)
      res.end('hello world!')
    })
  }
})

server.listen(8000, () => {
  console.log('success')
})
```
#nodejs处理路由
http://github.com/
http://github.com/username/
http://github.com/username/xxx

```js
const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log('url: ', url)
  const path = url.split('?')[0]
  res.end(path)
})

server.listen(8000, () => {
  console.log('ok')
})
```

综合案例
```js
const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])
  res.setHeader('Content-type', 'application/json')
  const resData = {
    method,
    url,
    path,
    query
  }
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})
server.listen(8000)
```

#搭建环境
安装依赖 nodemon cross-env
在package.json配置，修改node会自动重启
```json
"dev":"cross-env NODE_ENV=dev nodemon ./server/app.js"
```

#接口设计
初始化路由：根据之前技术方案的设计，做出路由
返回假数据：将路由和数据处理分类，符合设计原则
获取博客列表/api/blog/list  get

