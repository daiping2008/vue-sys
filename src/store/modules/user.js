const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED',
  SET_USER: 'SET_USER'
}
const state = {
  isAutnenticated: false,
  user: {}
}
const getters = {}
const mutations = {
  [types.SET_IS_AUTNENTIATED] (state, payload) {
    state.isAutnenticated = payload
  },
  [types.SET_USER] (state, payload) {
    state.user = payload
  }
}
const actions = {
  setIsAutnenticated ({ commit }, payload) {
    commit(types.SET_IS_AUTNENTIATED, payload)
  },
  setUser ({ commit }, payload) {
    commit(types.SET_USER, payload)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
