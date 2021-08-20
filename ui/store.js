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
        async loadDeposits ({ commit }) {
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
                const issueResponse = await fetch('https://mktcode.uber.space/ethbooster/issue/' + deposit.issueId).then(response => response.json())
                deposit.issue = issueResponse.node
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
        async loadIssue ({ commit }, variables) {
          try {
            const response = await fetch(`https://mktcode.uber.space/ethbooster/issue/${variables.owner}/${variables.repo}/${variables.number}`).then(response => response.json())
            let issue = response.repository.issue
            issue.balance = await contract.getIssueBalance(issue.id)
            let ethUsdRate = await pricefeedContract.latestRoundData()
            issue.balanceUsd = ethUsdRate.answer * issue.balance / Math.pow(10, 26)
            commit('setIssue', issue)
          } catch (e) {
            commit('setIssue', null)
          }
        },
      }
    })
  }
}
