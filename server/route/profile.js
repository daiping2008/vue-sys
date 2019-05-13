const router = require('koa-router')()
const ProfileModel = require('../db/models/profile')
router.prefix('/profile')
router.get('/', async ctx => {
  const res = await ProfileModel.find()
  ctx.body = { code: 0, data: res }
})
// 查询
router.get('/list', async ctx => {
  const res = await ProfileModel.find()
  ctx.body = { code: 0, data: res }
})

// 添加
router.post('/add', async ctx => {
  const { type, describe, income, expend, cash, remark } = ctx.request.body
  try {
    const newPorfile = new ProfileModel({ type, describe, income, expend, cash, remark })
    await newPorfile.save()
    return (ctx.body = { code: 0, data: { msg: '添加成功' } })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})
// 获得单个信息
router.get('/:id', async ctx => {
  const { id } = ctx.params
  try {
    const res = await ProfileModel.findOne({ _id: id })
    if (!res) return (ctx.body = { code: 1, msg: '没有商品' })
    return (ctx.body = { code: 0, data: res })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})
// 修改
router.post('/edit/:id', async ctx => {
  const { id } = ctx.params
  const { type, describe, income, expend, cash, remark } = ctx.request.body
  try {
    await ProfileModel.findOneAndUpdate({ _id: id }, { $set: { type, describe, income, expend, cash, remark, upadtedAt: Date.now() } }, { new: true })
    return (ctx.body = { code: 0, data: { msg: '修改成功' } })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})
// 删除
router.delete('/delete/:id', async ctx => {
  const { id } = ctx.params
  try {
    await ProfileModel.findOneAndDelete({ _id: id })
    return (ctx.body = { code: 0, data: { msg: '删除成功' } })
  } catch (err) {
    return (ctx.body = { code: 1, msg: '出错啦' })
  }
})
module.exports = router
