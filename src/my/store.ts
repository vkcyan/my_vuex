import { VueConstructor } from 'vue'

export class Store {
  actions: any
  _mutations: any
  _getters: any
  _vm: any
  constructor(options: any) {
    let state = options.state
    this.actions = options.actions
    this._mutations = Object.create(null)
    this._getters = Object.create(null)
    register(this, {
      getters: options.getters,
      mutations: options.mutations
    })
    processState(this, state)
    setTimeout(() => {
      state.data = 'my vuex'
    }, 1000)
  }
  get state() {
    // vuex的值发生变化的时候自动更新页面
    return this._vm.$data.$$mystore
  }
  commit(type: string, payload: any) {
    const commitFun = this._mutations[type]
    commitFun(payload)
  }
}

function register(store: any, options: any) {
  // 注册getters,这里遍历gettets对象,将 键 函数都传值到处理函数
  Object.keys(options.getters).forEach((type: string) => {
    store._getters[type] = () => {
      return options.getters[type](store.state)
    }
  })
  // 注册mutations
  Object.keys(options.mutations).forEach((type: string) => {
    store._mutations[type] = (payload: any) => {
      options.mutations[type].call(store, store.state, payload)
    }
  })
}

/**
 * 讲state处理成为响应式数据
 * @param store
 * @param state
 */
function processState(store: any, state: object) {
  store.getters = {}
  let computed: any = {}
  let getters = store._getters
  Object.keys(getters).forEach(key => {
    // 将getters数据与complate进行连接,获取getters实际运行至
    computed[key] = () => getters[key]()
    //getters数据响应式开启,并且get()事件发生后都直接访问到computed,继而触发更新
    Object.defineProperty(store.getters, key, {
      enumerable: true,
      get: () => store._vm[key]
    })
  })
  store._vm = new _Vue({
    // 使用vue 自带的响应式进行vuex的数据监听
    data: {
      $$mystore: state
    },
    computed
  })
}

/***
 * 注册函数
 */
let _Vue: VueConstructor
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
