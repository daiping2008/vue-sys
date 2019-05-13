import HTTP from '../utils/http'

class UserServer extends HTTP {
  register ({ username, password, email, avatar, identify }) {
    return this.request({
      url: '/user/register',
      data: { username, password, email, avatar, identify },
      method: 'POST'
    })
  }
  login ({ email, password }) {
    return this.request({
      url: '/user/login',
      data: { email, password },
      method: 'POST'
    })
  }
}

export default UserServer
