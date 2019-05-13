import axios from 'axios'
import { Message } from 'element-ui'

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
          } else {
            Message.error(data.msg)
            reject(data.msg)
          }
        } else {
          Message.error('出错啦')
          reject(new Error('出错啦'))
        }
      }).catch(err => {
        Message.error('出错啦')
        reject(err)
      })
    })
  }
}

export default HTTP
