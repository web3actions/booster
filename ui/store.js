import { createStore } from 'vuex'
import { ethers } from 'ethers'
import { crypto } from '../package.json'
import ABI from '../contract/abi.json'

export default {
  init: () => {
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
    const ethSigner = ethProvider.getSigner()
    const bareContract = new ethers.Contract(crypto.ethereum.contract, ABI, ethProvider)
    const contract = bareContract.connect(ethSigner)
    
    return createStore({
      state () {
        return {
          address: null,
          deposits: [],
          depositTx: null,
          accessToken: null,
          user: null,
          issue: null,
          showDeposits: false
        }
      },
      mutations: {
        setAddress (state, address) {
          state.address = address
        },
        setDeposits (state, deposits) {
          state.deposits = deposits
        },
        setDepositTx (state, hash) {
          state.depositTx = hash
        },
        setAccessToken (state, token) {
          state.accessToken = token
        },
        setUser (state, user) {
          state.user = user
        },
        setIssue (state, issue) {
          state.issue = issue
        },
        setShowDeposits (state, show) {
          state.showDeposits = show
        }
      },
      actions: {
        async loadAddress ({ commit }) {
          try {
            let address = await ethSigner.getAddress()
            commit('setAddress', address)
          } catch {
            commit('setAddress', null)
            commit('setDeposits', [])
          }
        },
        async connectWallet ({ commit, dispatch }) {
          try {
            await ethProvider.send('eth_requestAccounts', [])
            await dispatch('loadAddress')
          } catch {
            commit('setAddress', null)
            commit('setDeposits', [])
          }
        },
        async loadDeposits ({ state, commit }) {
          if (!state.accessToken) return
    
          try {
            const depositIds = await contract.getDepositIdsBySender()
            const filteredDeposits = []
            for (let i = 0; i < depositIds.length; i++) {
              const depositRaw = await contract.getDepositById(depositIds[i])
              const deposit = {
                id: depositIds[i],
                issueId: depositRaw[1],
                value: depositRaw[2],
                withdrawalRound: depositRaw[3],
              }
    
              if (deposit.value != 0) {
                const issueResponse = await fetch('https://api.github.com/graphql', {
                  method: 'POST',
                  headers: {
                    Authorization: 'bearer ' + state.accessToken
                  },
                  body: JSON.stringify({
                    query: `query ($issueId: ID!) { node(id: $issueId) { ... on Issue { url title number repository { name owner { login }}}}}`,
                    variables: { issueId: deposit.issueId }
                  })
                }).then(response => response.json())
                deposit.issue = issueResponse.data.node
                deposit.issueWithdrawalRound = await contract.getIssueWithdrawalRound(deposit.issueId)
                filteredDeposits.push(deposit)
              }
            }
    
            commit('setDeposits', filteredDeposits)
          } catch {
            commit('setDeposits', [])
          }
        },
        async cancelDeposit ({ dispatch }, id) {
          try {
            const tx = await contract.cancel(id)
            await tx.wait()
            await dispatch('loadDeposits')
          } catch {
            return
          }
        },
        async deposit ({ state, commit, dispatch }, amount) {
          try {
            const pendingTx = await contract.deposit(state.issue.id, { value: ethers.utils.parseEther(amount) })
            const depositTx = await pendingTx.wait()
            commit('setDepositTx', depositTx.transactionHash)
            dispatch('loadIssue', {
              owner: state.issue.repository.owner.login,
              repo: state.issue.repository.name,
              number: state.issue.number
            })
          } catch {
            commit('setDepositTx', null)
          }
        },
        async loadUser ({ state, commit }) {
          if (!state.accessToken) return
    
          try {
            const response = await fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                Authorization: 'bearer ' + state.accessToken
              },
              body: JSON.stringify({ query: 'query { viewer { login, avatarUrl } }' })
            }).then(response => response.json())
        
            commit('setUser', response.data.viewer)
          } catch (e) {
            commit('setUser', null)
          }
        },
        async loadAccessToken ({ commit, dispatch }) {
          commit('setAccessToken', localStorage.getItem('accessToken'))
          try {
            const code = (new URLSearchParams(window.location.search)).get('code')
            if (code) {
              window.history.replaceState({}, document.title, window.location.origin)
              const data = await fetch('https://mktcode.uber.space/github-oauth?app=ethbooster&code=' + code).then(response => response.json())
              if (data.access_token) {
                localStorage.setItem('accessToken', data.access_token)
                commit('setAccessToken', data.access_token)
              }
            }
          } catch {
            dispatch('revokeAccessToken')
          }
        },
        revokeAccessToken ({ commit }) {
          localStorage.removeItem('accessToken')
          commit('setAccessToken', null)
          commit('setUser', null)
        },
        async loadIssue ({ state, commit }, variables) {
          if (!state.accessToken) return
        
          try {
            const response = await fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                Authorization: 'bearer ' + state.accessToken
              },
              body: JSON.stringify({
                query: `query($owner: String!, $repo: String!, $number: Int!) {
                  repository(owner: $owner, name: $repo) {
                    issue(number: $number) {
                      id
                      title
                      number
                      closed
                      url
                      repository {
                        name
                        owner {
                          login
                        }
                      }
                      author {
                        ... on User {
                          login
                        }
                      }
                    }
                  }
                }`,
                variables
              })
            }).then(response => response.json())
    
            let issue = response.data.repository.issue
            issue.balance = await contract.getIssueBalance(issue.id)
            commit('setIssue', issue)
          } catch (e) {
            commit('setIssue', null)
          }
        }
      }
    })
  }
}
