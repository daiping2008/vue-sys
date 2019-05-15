const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path

  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    console.log('author', author)
    console.log('keyword', keyword)
    const r = getList(author, keyword)
    return new SuccessModel(r)
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    const { id } = req.query
    console.log('id: ', id)
    const r = getDetail(id)
    return new SuccessModel(r)
  }
  if (method === 'POST' && path === '/api/blog/new') {
    const body = req.body
    console.log('body', body)
    const r = addBlog(body)
    if (r) {
      return new SuccessModel('添加成功')
    } else {
      return new ErrorModel('添加失败')
    }
  }
  if (method === 'POST' && path === '/api/blog/update') {
    const { id } = req.query
    const body = req.body
    console.log('id:', id)
    console.log('body:', body)
    const r = updateBlog(id, body)
    if (r) {
      return new SuccessModel('修改成功')
    } else {
      return new ErrorModel('修改失败')
    }
  }
  if (method === 'POST' && path === '/api/blog/del') {
    const { id } = req.body
    console.log('id:', id)
    const r = delBlog(id)
    if (r) {
      return new SuccessModel('删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = handleBlogRouter
