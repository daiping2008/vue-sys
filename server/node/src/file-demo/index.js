
// 案例一
// const fs = require('fs')

// const { resolve } = require('path')

// const http = require('http')

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET') {
//     const fileName = resolve(__dirname, 'data.txt')
//     const readStream = fs.createReadStream(fileName)
//     readStream.pipe(res)
//   }
// })

// server.listen(3000, () => {
//   console.log('ok!')
// })

// 案例二 拷贝文件
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
