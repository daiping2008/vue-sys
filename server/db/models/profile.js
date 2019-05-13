const mongoose = require('mongoose')

const schema = mongoose.Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    require: true
  },
  expend: {
    type: String,
    require: true
  },
  cash: {
    type: String,
    require: true
  },
  remark: {
    type: String
  },
  createdAt: {
    type: String,
    default: Date.now()
  },
  upadtedAt: {
    type: String,
    default: Date.now()
  }
})

module.exports = mongoose.model('profile', schema)
