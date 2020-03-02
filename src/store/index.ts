import Vue from 'vue'
import myStore from '../my/index'

Vue.use(myStore)

export default new myStore.Store({
  state: {
    data: 1
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    pushdata: (state: any, data: any) => {
      return `data为${state.data}`
    }
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex';

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     data: 1
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
