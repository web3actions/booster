import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      user: null,
      accessToken: null,
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
    user (state) {
      return state.user
    },
    accessToken (state) {
      return state.accessToken
    },
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
    setUser (state, user) {
      state.user = user
    },
    setAccessToken (state, token) {
      state.accessToken = token
    },
    toggleOnlyOwn (state) {
      state.onlyOwn = !state.onlyOwn
    },
    toggleSort (state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc'
    },
    setIssue (state, issue) {
      state.issue = issue
    }
  },
  actions: {
    loadUser ({ commit, state }) {
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: 'bearer ' + state.accessToken
        },
        body: JSON.stringify({ query: 'query { viewer { login, avatarUrl } }' })
      }).then(res => res.json()).then(res => {
        commit('setUser', res.data.viewer)
      })
    }
  }
})
