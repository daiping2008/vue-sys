const { getList, getDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path

  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    return getList(author, keyword).then(result => {
      return new SuccessModel(result)
    })
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    const { id } = req.query
    return getDetail(id).then(result => {
      return new SuccessModel(result)
    })
  }
  if (method === 'POST' && path === '/api/blog/new') {
    const body = req.body
    console.log('body', body)
    return addBlog({
      title: body.title,
      content: body.content,
      author: 'susan'
    }).then(result => {
      if (result > 0) {
        return new SuccessModel('添加成功')
      } else {
        return new ErrorModel('添加失败')
      }
    })
  }
  if (method === 'POST' && path === '/api/blog/update') {
    const { id } = req.query
    const body = req.body
    console.log('id:', id)
    console.log('body:', body)
    return updateBlog({
      id,
      title: body.title,
      content: body.content
    }).then(result => {
      if (result > 0) {
        return new SuccessModel('修改成功')
      } else {
        return new ErrorModel('修改失败')
      }
    })
  }
  if (method === 'POST' && path === '/api/blog/del') {
    const { id } = req.query
    console.log('id:', id)
    return delBlog(id).then(result => {
      if (result) {
        return new SuccessModel('删除成功')
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter
