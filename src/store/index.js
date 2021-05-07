import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      avatarId: 0
    }
  },
  mutations: {
    login(state, user) {
      state.user = user
    }
  },
  actions: {
   
  },
  modules: {
  }
})
