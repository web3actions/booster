import { createStore } from 'vuex'
import { ethers, BigNumber } from 'ethers'
import { crypto } from '../package.json'
import ABI from '../contract/abi.json'

export default {
  init: () => {
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
    const ethSigner = ethProvider.getSigner()
    const bareContract = new ethers.Contract(crypto.ethereum.contract, ABI, ethProvider)
    const contract = bareContract.connect(ethSigner)
    const SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ethbooster/ethbooster'
    
    const barePricefeedContract = new ethers.Contract(
      '0x9326BFA02ADD2366b30bacB125260Af641031331',
      [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
      ethProvider
    )
    const pricefeedContract = barePricefeedContract.connect(ethSigner)

    return createStore({
      state () {
        return {
          address: null,
          deposits: [],
          depositTx: null,
          issue: null,
          showDeposits: false,
          ethUsdPrice: BigNumber.from(0)
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
        setIssue (state, issue) {
          state.issue = issue
        },
        setShowDeposits (state, show) {
          state.showDeposits = show
        },
        setEthUsdPrice (state, price) {
          state.ethUsdPrice = price
        },
      },
      actions: {
        async loadAddress ({ commit }) {
          try {
            const address = await ethSigner.getAddress()

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
          try {
            const query = `query ($address:ID!) {
              sender(id: $address) {
                id
                deposits {
                  id
                  value
                  issue {
                    id
                    withdrawalRound
                  }
                }
              }
            }`
            const variables = { address: state.address.toLowerCase() }
            const response = await fetch(SUBGRAPH_ENDPOINT, {
              method: 'POST',
              body: JSON.stringify({ query, variables })
            }).then(res => res.json())
            const deposits = response.data.sender.deposits

            for (let i = 0; i < deposits.length; i++) {
              const issueResponse = await fetch('https://mktcode.uber.space/ethbooster/issue/' + deposits[i].issue.id).then(response => response.json())
              deposits[i].issue = issueResponse.node
              deposits[i].issue.withdrawalRound = await contract.getIssueWithdrawalRound(deposits[i].issue.id)
            }
    
            commit('setDeposits', deposits)
          } catch (e) {
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
        async loadIssue ({ commit }, { owner, repo, number }) {
          try {
            const githubResponse = await fetch(`https://mktcode.uber.space/ethbooster/issue/${owner}/${repo}/${number}`).then(response => response.json())
            let issue = githubResponse.repository.issue
            issue.deposits = []
            issue.withdrawalRound = 0

            const query = `query ($issueId:ID!) {
              issue (id: $issueId) {
                withdrawalRound
                id
                deposits {
                  id
                  value
                }
              }
            }`
            const variables = { issueId: issue.id }
            const subgraphResponse = await fetch(SUBGRAPH_ENDPOINT, {
              method: 'POST',
              body: JSON.stringify({ query, variables })
            }).then(res => res.json())
            if (subgraphResponse.data.issue) {
              issue.deposits = subgraphResponse.data.issue.deposits
              issue.withdrawalRound = subgraphResponse.data.issue.withdrawalRound
            }
            commit('setIssue', issue)
          } catch (e) {
            console.log(e)
            commit('setIssue', null)
          }
        },
        async loadEthUsdPrice ({ commit }) {
          try {
            const query = `query {
              feed(id: "0x37bc7498f4ff12c19678ee8fe19d713b87f6a9e6") {
                latestRound: rounds(
                  where: { value_not: null }
                  first: 1
                  orderBy: unixTimestamp
                  orderDirection: desc
                ) {
                  value
                }
              }
            }`
            const subgraphResponse = await fetch('https://gql.graph.chain.link/subgraphs/name/ethereum-mainnet', {
              method: 'POST',
              body: JSON.stringify({ query })
            }).then(res => res.json())

            commit('setEthUsdPrice', BigNumber.from(subgraphResponse.data.feed.latestRound[0].value))
          } catch {
            commit('setEthUsdPrice', BigNumber.from(0))
          }
        }
      }
    })
  }
}
