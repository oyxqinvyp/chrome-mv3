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
    setState: (state, param) => state.userData = param,
    setUserSite: (state, param) => state.userSite = param,
  },
  actions: {
    setState: ({ commit }, param) => commit('setState', param),
    setUserSite: ({ commit }, param) => commit('setState', param),
  }
})