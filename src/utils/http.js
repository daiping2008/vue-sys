import axios from 'axios'
import { Message, Loading } from 'element-ui'
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const endLoading = () => {
  loading.close()
}
axios.interceptors.request.use(config => {
  // 添加Loading
  startLoading()
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => {
  return err
})
axios.interceptors.response.use(config => {
  // 删除Loading
  endLoading()
  return config
}, err => {
  endLoading()
  return err
})
class HTTP {
  request ({ url, data, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          if (data.code === 0) {
            resolve(data.data)
          } else if (data.code === 10) {
            // token过期或者未登录
            window.location.href = '/login'
          } else {
            Message.error(data.msg)
            reject(data.msg)
          }
        } else {
          Message.error('出错啦!')
          reject(new Error('出错啦!'))
        }
      }).catch(err => {
        Message.error('出错啦')
        reject(err)
      })
    })
  }
}

export default HTTP
