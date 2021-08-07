import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      onlyOwn: false,
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
    onlyOwn (state) {
      return state.onlyOwn
    },
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
    toggleOnlyOwn (state) {
      state.onlyOwn = !state.onlyOwn
    },
    toggleSort (state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc'
    },
    setIssue (state, issue) {
      state.issue = issue
    }
  }
})
