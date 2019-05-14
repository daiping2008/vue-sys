import HTTP from '@/utils/http'

class ProfileServer extends HTTP {
  getProfileList () {
    return this.request({
      url: '/profile/list'
    })
  }
  addProfile (profile) {
    return this.request({
      url: '/profile/add',
      data: profile,
      method: 'POST'
    })
  }
  delProfile (id) {
    return this.request({
      url: `/profile/delete/${id}`,
      method: 'DELETE'
    })
  }
}

export default ProfileServer
