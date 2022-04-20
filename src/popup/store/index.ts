import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
    userSite: []
  },
  getters: {
    getUserData: state => state.userData,
    getUserSite: state => state.userSite,
  },
  mutations: {
    setUserData: (state, param) => state.userData = param,
    setUserSite: (state, param) => state.userSite = param,
  },
  actions: {
    setUserData: ({ commit }, param) => commit('setUserData', param),
    setUserSite: ({ commit }, param) => commit('setUserSite', param),
  }
})