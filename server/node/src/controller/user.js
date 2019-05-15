const { exec } = require('../db/index')
const login = ({ username, password }) => {
  const sql = `SELECT * FROM users WHERE username = '${username}' and password = '${password}'`
  return exec(sql).then(res => {
    return res[0]
  })
}
module.exports = {
  login
}
