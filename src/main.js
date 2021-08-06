import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state () {
    return {
      sort: 'desc',
      issue: ''
    }
  },
  getters: {
    sort (state) {
      return state.sort
    },
    issue (state) {
      return state.issue
    },
  },
  mutations: {
    toggleSort (state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc'
    },
    setIssue (state, issue) {
      state.issue = issue
    }
  }
})

const app = createApp(App)
app.use(store)
app.mount('#app')