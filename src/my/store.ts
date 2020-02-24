import { VueConstructor } from 'vue';


export class Store {
  _state: any;
  actions: any;
  mutations: any;
  getters: any;
  _vm: any;
  constructor(options: any) {
    this._state = options.state
    this.actions = options.actions
    this.mutations = options.mutations
    this.getters = options.getters
    this._vm = new _Vue({
      // 使用vue 自带的响应式进行vuex的数据监听
      data: {
        $$mystore: this._state
      }
    })
    setTimeout(() => {
      this._state.data = 2
    }, 1000);
  }
  get state() {
    // vuex的值发生变化的时候自动更新页面
    return this._vm.$data.$$mystore
  }
}

/***
 * 
 */
let _Vue: VueConstructor;
export function install(Vue: VueConstructor) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      // 每次组件进行挂载都会进行一次beforeCreate的生命周期
      // 所以判断只有第一次的时候才进行,后面的依旧引用之前的或者是进行再次引用
      const options: any = this.$options
      if (options.myStore) {
        this.$mystore = options.myStore
      } else if (options.parent && options.parent.$mystore) {
        this.$mystore = options.parent.$mystore
      }
    }
  })
}