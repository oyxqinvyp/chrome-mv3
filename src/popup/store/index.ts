import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {
      Token: '',
    },
    userSite: [],
    isLoading: false,
  },
  getters: {
    getUserData: state => state.userData,
    getUserSite: state => state.userSite,
    getIsLoading: state => state.isLoading
  },
  mutations: {
    setUserData: (state, param) => state.userData = param,
    setUserSite: (state, param) => state.userSite = param,
    setIsLoading: (state, param) => state.userSite = param,
  },
  actions: {
    setUserData: ({ commit }, param) => commit('setUserData', param),
    setUserSite: ({ commit }, param) => commit('setUserSite', param),
    setIsLoading: ({ commit }, param) => commit('setIsLoading', param),
  }
})