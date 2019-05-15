const { exec } = require('../db')
// 获得博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) sql += `and author ='${author}' `
  if (keyword) sql += `and title like '%${keyword}'`
  return exec(sql).then(result => {
    return result
  })
}
// 获得博客详情
const getDetail = id => {
  const sql = `select * from blogs where id = ${id}`
  return exec(sql).then(result => {
    return result[0]
  })
}
// 新增博客信息
const addBlog = ({ title, content, author }) => {
  const sql = `INSERT INTO blogs (title, content, author, createTime) VALUES ('${title}', '${content}', '${author}', ${Date.now()})`
  return exec(sql).then(result => {
    return result.affectedRows
  })
}
// 修改博客信息
const updateBlog = ({ id, title, content }) => {
  const sql = `update blogs set title='${title}', content='${content}'  where id = ${id}`
  return exec(sql).then(result => {
    return result.affectedRows
  })
}
// 删除博客信息
const delBlog = id => {
  const sql = `delete from blogs where id = ${id}`
  return exec(sql).then(result => {
    return result.affectedRows
  })
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}
