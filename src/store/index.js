import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    socket: null
  },
  mutations: {
    login(state, username) {
      state.username = username
    }
  },
  actions: {
   
  },
  modules: {
  }
})
