import HTTP from '@/utils/http'

class ProfileServer extends HTTP {
  getProfileList () {
    return this.request({
      url: '/profile/list'
    })
  }
}

export default ProfileServer
