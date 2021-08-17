import { createStore } from 'vuex'
import { ethers } from 'ethers'

export default createStore({
  state () {
    return {
      user: null,
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
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setSearch (state, search) {
      state.search = search
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
    loadUser ({ commit }, accessToken) {
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: 'bearer ' + accessToken
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
