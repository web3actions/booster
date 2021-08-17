import { createStore } from 'vuex'
import { ethers } from 'ethers'

export default createStore({
  state () {
    return {
      user: null,
      accessToken: null,
      ethAddress: null,
      search: '',
      onlyOwn: false,
      sort: 'desc',
      issue: null,
      showIssueModal: false,
      issues: [
        {
          node_id: 'adadad',
          title: 'Setup Subgraph',
          bounty: BigInt('1250000000000000000')
        },
        {
          node_id: 'adadad',
          title: 'Implement Bot',
          bounty: BigInt('750000000000000000')
        },
        {
          node_id: 'adadad',
          title: 'Search ALL comments when parsing commands',
          bounty: BigInt('500000000000000000')
        },
        {
          node_id: 'adadad',
          title: 'Setup Subgraph',
          bounty: BigInt('50000000000000000')
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
    ethAddress (state) {
      return state.ethAddress
    },
    search (state) {
      return state.search
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
    showIssueModal (state) {
      return state.showIssueModal
    },
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setSearch (state, search) {
      state.search = search
    },
    setAccessToken (state, token) {
      state.accessToken = token
    },
    setEthAddress (state, address) {
      state.ethAddress = address
    },
    toggleOnlyOwn (state) {
      state.onlyOwn = !state.onlyOwn
    },
    toggleSort (state) {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc'
    },
    setIssue (state, issue) {
      state.issue = issue
    },
    setShowIssueModal (state, show) {
      state.showIssueModal = show
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
    },
    async connectWallet ({ commit }) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
      const ethSigner = ethProvider.getSigner()
      await ethProvider.send('eth_requestAccounts', [])
      const address = await ethSigner.getAddress()
      commit('setEthAddress', address)
    }
  }
})
