const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avator: {
    type: String
  },
  identify: {
    type: Number,
    require: true
  },
  createdAt: {
    type: String,
    default: Date.now()
  },
  updateAt: {
    type: String,
    default: Date.now()
  }
})

module.exports = mongoose.model('user', schema)
