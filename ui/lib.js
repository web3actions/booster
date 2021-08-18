import { ref } from 'vue'
import { ethers, BigNumber } from 'ethers'
import { crypto } from '../package.json'
import ABI from '../contract/abi.json'

// wallet
const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()
const bareContract = new ethers.Contract(crypto.ethereum.contract, ABI, ethProvider)
const contract = bareContract.connect(ethSigner)
const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther

const address = ref(null)
const loadAddress = async () => {
  try {
    address.value = await ethSigner.getAddress()
  } catch {
    address.value = null
  }
}

const connectWallet = async () => {
  try {
    await ethProvider.send('eth_requestAccounts', [])
    await loadAddress()
  } catch {
    address.value = null
  }
}

// user
const loadingUser = ref(false)
const user = ref(null)
const loadUser = async (accessToken) => {
  loadingUser.value = true
    
  if (accessToken) {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: 'bearer ' + accessToken
        },
        body: JSON.stringify({ query: 'query { viewer { login, avatarUrl } }' })
      }).then(response => response.json())
  
      user.value = response.data.viewer
    } catch (e) {
      user.value = null
    }
  }

  loadingUser.value = false
}

const accessToken = ref(null)
const loadAccessToken = async () => {
  accessToken.value = localStorage.getItem('accessToken')
  try {
    const code = (new URLSearchParams(window.location.search)).get('code')
    if (code) {
      window.history.replaceState({}, document.title, window.location.origin)
      const data = await fetch('https://mktcode.uber.space/github-oauth?app=ethbooster&code=' + code).then(response => response.json())
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token)
        accessToken.value = data.access_token
      }
    }
  } catch {
    revokeAccessToken()
  }
}

const revokeAccessToken = () => {
  localStorage.removeItem('accessToken')
  accessToken.value = null
  user.value = null
}

// issue
const loadingIssue = ref(false)
const issue = ref(null)
const loadIssue = async (accessToken, owner, repo, number) => {
  if (!accessToken) return null

  try {
    loadingIssue.value = true
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'bearer ' + accessToken
      },
      body: JSON.stringify({
        query: `query($owner: String!, $repo: String!, $number: Int!) {
          repository(owner: $owner, name: $repo) {
            issue(number: $number) {
              id
              title
              number
              closed
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
        variables: { owner, repo, number }
      })
    }).then(response => response.json())

    issue.value = response.data.repository.issue
    issue.value.balance = BigNumber.from(0)
  } catch (e) {
    issue.value = null
  }

  try {
    issue.value.balance = await contract.getIssueBalance(issue.value.id)
  } catch {
    issue.value.balance = BigNumber.from(0)
  }

  loadingIssue.value = false
}

export {
  contract,
  parseEther,
  formatEther,
  address,
  connectWallet,
  loadAddress,
  accessToken,
  loadAccessToken,
  revokeAccessToken,
  user,
  loadUser,
  issue,
  loadIssue,
  loadingIssue
}