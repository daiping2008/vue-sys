const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'myblog'
})

connection.connect()

const exec = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) reject(err)
      else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  exec
}
