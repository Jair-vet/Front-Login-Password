import { createStore } from 'vuex'

interface State {
  props?: boolean,
  name: string
}

export default createStore<State>({
  state: {
    props: undefined,
    name: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
