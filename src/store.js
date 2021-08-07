import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      sort: 'desc',
      issue: null,
      issues: [
        {
          node_id: 'adadad',
          title: 'Setup Subgraph'
        },
        {
          node_id: 'adadad',
          title: 'Setup Subgraph'
        },
        {
          node_id: 'adadad',
          title: 'Setup Subgraph'
        },
        {
          node_id: 'adadad',
          title: 'Setup Subgraph'
        },
      ]
    }
  },
  getters: {
    sort (state) {
      return state.sort
    },
    issue (state) {
      return state.issue
    },
    issues (state) {
      return state.issues
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
