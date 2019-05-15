// 获得博客列表
const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1557899724009,
      author: 'susan'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1557899724009,
      author: 'Lee'
    }
  ]
}
// 获得博客详情
const getDetail = id => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    createTime: 1557899724009,
    author: 'susan'
  }
}
// 新增博客信息
const addBlog = body => {
  return true
}
// 修改博客信息
const updateBlog = (id, body) => {
  return true
}
// 删除博客信息
const delBlog = id => {
  return true
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  delBlog
}
