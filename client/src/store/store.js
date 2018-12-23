import Vue from 'vue'
import Vuex from 'vuex'

import persistCredentials from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [persistCredentials()],
  state: {
    token: null,
    user: null,
    loggedIn: false
  },
  getters: {

  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.loggedIn = true
      } else {
        state.loggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
