import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state () {
    return {
      issue: ''
    }
  },
  getters: {
    issue (state) {
      return state.issue
    },
  },
  mutations: {
    issue (issue) {
      state.issue = issue
    }
  }
})

const app = createApp(App)
app.use(store)
app.mount('#app')