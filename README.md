## nodejs

# 模块化
定义
```js
function add(a, b){ return a+b}
module.exports = add
```
引用
```js
const add = require('./a)
```
# node的debug
使用vscode的debug模式
# 服务稳定性
server端可能会遭受各种恶意攻击和误操作
单个客户端可以意外挂掉，但是服务器不能
进程守候
# 考虑CPU和内存
客户端独占一个浏览器，内存和CPU都不是问题
server端要承载很多请求，CPU和内存都是稀缺资源
steam写日志，使用redis存session
# 日志记录
前端也会参与写日志，但只是日志的发起方，不关心后续
server端要记录日志，存储日志，分析日志，前端不关心
# 安全
server端要随时准备接受各种恶意攻击，前端则少很多
如：越权操作，数据库攻击等
预防xss攻击和sql注入
# 集群和服务拆分
产品发展速度快，流量可能会迅速增加

# 目标
开发一个博客系统，具有博客的基本功能
只开发server端，不关心前端
# 技术方案

# http
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
# nodejs处理get请求
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
# nodejs处理postqingq
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
# nodejs处理路由
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

# 搭建环境
安装依赖 nodemon cross-env
在package.json配置，修改node会自动重启
```json
"dev":"cross-env NODE_ENV=dev nodemon ./server/app.js"
```

# 接口设计
初始化路由：根据之前技术方案的设计，做出路由
返回假数据：将路由和数据处理分类，符合设计原则
获取博客列表/api/blog/list  get

# mysql
安装mysql,MySQL Workbeach

# 建库
```sql
CREATE SCHEMA `myblog` ;
```
# 建表
```sql
CREATE TABLE `myblog`.`new_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(20) NOT NULL,
  `createTime` BIGINT(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
```
# 操作表
```sql
use myblog
```
# 插入操作
```sql
insert into users (username, `password`, realname) values ('susan', '123', '苏珊')
```
# 查询操作
```sql
select * from users

select id, username from users

select * from users where username='susan'

select * from users where username='susan' or `password` ='123'

select * from users where username like '%a%'

select * from users order by id desc
```
# 更新操作
```sql
update users set realname='苏' where id = 2
```
# 删除操作
```sql
delete from users where id = 2
```

# cookie
存储在浏览器的一段字符串
跨域不共享
格式如K1=V1;K2=V2;K3=V3;因此可以存储结构化数据

每次发生http请求，会将请求域的cookie一起发生给server
server可以修改cookie并返回给浏览器
浏览器中也可以通过js修改cookie

客户端添加cookie
```js
document.cookie='key=value'
```
server端nodejs操作cookie
解析cookie
```js
req.cookie = {}
const cookie = req.headers.cookie || ''
cookie.split(';').forEach(item=>{
  if(!item) return 
  const arr = item.split('=')
  const key = arr[0]
  const val = arr[1]
  req.cookie[key] = val
})
```
设置cookie
```js
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))
  return d.toGMTString()
}

res.setHeader('Set-Cookie', `username=${username}; path=/;httpOnly; expires=${getCookieExpires()} `)
```

# session

问题
session是js变量，放在nodejs进程内存中
内存有限，访问量过大，内存暴增
正式线上运行时多进程，进程之间内存无法共享
# redis
web server最常用的缓存数据库，数据库放在内存中
相比于mysql，访问速度快
但是成本更高，可储存数量少

将web server和redis拆分为两个单独的服务
双方都是独立的，都是可扩展的

可以解决session的几个问题

session访问频繁，对性能要求极高
session数据量不会太大

网站数据不适合redis
操作频率不是太高
数据量太大，内存成本太高


## 日志
系统没有日志，等于人没有眼睛
访问日志access log(每个接口日志)
自定义日志(包括事件日志，错误日志)

日志放在文件中，
  需要nodejs文件操作，nodejs steam提高写日志性能
日志功能开发和使用
日志文件拆分，日志内容分析

日志不存储到redis中，因为日志文件非常大，日志对性能要求不是很高
日志不存储到mysql中

```js
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')
fs.readFile(fileName, (err, data) => {
  if (err) return 
  // data是二进制类型，需要转换字符串
  console.log(data.toString())
})
```
写入
```js
const content = '这是新写入的内容\n'
fs.writeFile(fileName, (err, data) => {
  if (err) return 
  // data是二进制类型，需要转换字符串
  console.log(data.toString())
})
```
判断文件是否存在
```js
fs.exists(fileName, exist=>{
  console.log(exist)
})
```

# IO操作的性能瓶颈
IO包括 网络IO 和 文件IO
相比于CPU计算和内存读写，IO的特点就是慢
如何在有限的硬件资源下提高IO的操作频率

# stream

```js
const fs = require('fs')

const { resolve } = require('path')

const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const fileName = resolve(__dirname, 'data.txt')
    const readStream = fs.createReadStream(fileName)
    readStream.pipe(res)
  }
})

server.listen(3000, () => {
  console.log('ok!')
})

```

拷贝文件
```js
const fs = require('fs')

const { resolve } = require('path')

const source = resolve(__dirname, 'data.txt')
const result = resolve(__dirname, 'data-bnk.txt')

const readStream = fs.createReadStream(source)
const writeStream = fs.createWriteStream(result)
readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('写入完毕')
})
readStream.on('error', err => {
  console.log(err)
})
```
日志操作
```js
const fs = require('fs')
const { join } = require('path')

// 写日志
function writeLog (writeStream, log) {
  writeStream.write(log + '\n')
}

// 生成 write Stream
function createWriteStream (fileName) {
  const fullFileName = join(__dirname, '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}
// 访问日志
const accessWriteStream = createWriteStream('access.log')

function access (log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}

```
# 日志拆分
日志都放一个文件中不好处理
可以按直接划分日志文件
实现方式：linux的crontab命令，即定时任务


## 安全
# sql注入：窃取数据库内容
最原始，最简单的攻击，从有了web2.0有了sql注入攻击
攻击方式；输入一个sql片段，最终拼接成一段攻击代码
预防措施：使用mysql的escape函数处理内容即可
方法一：使用escape()对传入参数进行编码
参数编码方法如下
```js
mysql.escape(param)
connection.escape(param)
pool.escape(param)
```
```js
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ' + connection.escape(userId) + ', name = ' + connection.escape(name), function(err, results) {
// ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test'
```
方法二：使用connection.query()的查询参数占位符
使用查询参数占位符，会自动执行connection.escape()
```js
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ?, name = ?', [userId, name], function(err, results) {
// ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test'
```
# XSS攻击：窃取前端的cookie内容
攻击方式：在页面展示内容中掺杂js代码，获取网页信息
预防措施：转换生成js的特殊字符
# 密码加密：保障用户信息安全


## express
express下载，安装和使用，express中间件机制
开发接口，连接数据库，实现登录，日志记录

# 介绍express
安装（使用脚手架express-generator）
npm install express-generator -g
express express-test
npm install & npm start

# app.js

# 中间件机制
app.use
next

# 登录
使用express-session 和 connect-redis
req.session保存登录信息，登录校验做出express中间件

session存储到内存中
express-session
```js
// 每次请求都会有session的值
const session = require('express-session')
// sesion存储到内存中，即req.session
app.use(session({
  secret:'任意字符串',
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24 * 60 * 60 * 1000
  }
}))

// 登录
req.session.username=data.username,
```
session存储到redis中
redis, connect-redis
```js
// redis文件
const redis = require('redis')
const redisClient = redis.createClient(xxx,xxx)
redisClient.on('error', err => {
  console.log(err)
})
module.exports = redisClient

// app.js
const RedisStore = require('connect-redis')(session)// session是上面express-session
const redisClient = require('redis文件路径')
const sessionStore = new RedisStore({
  client: redisClient
})
// session存储到redis
app.use(session({
  secret:'任意字符串',
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24 * 60 * 60 * 1000
  },
  store: sessionStore
}))
```
登录中间件
```js
module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return 
  }
  res.json({
    code: 1,
    msg: '未登录'
  })
}

router.get('/list', loginCheck, (req, res, next) => {
})

``` 
# 日志
access log记录，直接使用morgan
自定义日志使用console.log和console.error即可
日志拆分，日志内容分析

开发环境使用控制台打印日志，线上环境日志打印到access.log文件中
```js
const logger = require('morgan')
const ENV = process.env.NODE_ENV
if (ENV === 'production') {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
} else {
  app.use(logger('dev'), {
    stream: process.stdout
  })
}
```

# express中间件原理
app.use 注册中间件
遇到http请求，根据path和method判断触发哪些方法
实现next机制，即上一个通过next触发一个中间件


## koa2
