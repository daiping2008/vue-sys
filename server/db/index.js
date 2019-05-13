const mongoose = require('mongoose')
const config = require('../config')
exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbs)
    const db = mongoose.connection

    db.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        db.connect(config.dbs)
      } else {
        reject(new Error('数据库挂了'))
      }
    })

    db.on('error', err => {
      if (maxConnectTimes >= 5) {
        reject(err)
      }
    })

    db.on('open', () => {
      console.log('数据库连接成功')
      resolve()
    })
  })
}
