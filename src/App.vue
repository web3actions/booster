<template>
  <div class="px-10 mx-auto flex flex-col items-center justify-center min-h-screen sm:w-full md:w-2/3 lg:w-1/2">
    <div v-if="!ethereumEnabled" class="text-red-900 mb-5">
      Ethereum is not supported by your browser. <a href="https://metamask.io"><u>Install MetaMask</u></a>
    </div>
    <div v-if="depositTx && issue" class="bg-gray-900 rounded-3xl text-white p-5">
      <h1 class="text-3xl font-extrabold mb-5">Deposit Successful!</h1>
      <p>
        One more step. You should <a :href="issue.html_url" target="__blank"><u>leave a comment</u></a> to let everyone know about this bounty. Include a link to the transaction for other's to validate your deposit. Here's a template you can copy:
      </p>
      <div class="border border-gray-600 rounded-xl p-3 my-3 text-gray-300">
        Hey! I just deposited {{ amount }} ETH for this issue. Whoever solves it via a merged pull request. Can withdraw the bounty [here](https://github.com/ethbooster/oracle/issues/new?template=withdraw.md&title=Withdraw)<br>
        <br>
        As the maintainer, comment "/release-eth @user" to release the bounty manually.<br>
        <br>
        You can see the transaction [here](https://kovan.etherscan.io/tx/{{ depositTx.transactionHash }}).
      </div>
      <p>
        If you deposited at least 0.1 ETH, you can also post the transaction hash <a href="https://github.com/ethbooster/oracle/issues/new?template=tweet.md&title=Tweet" target="__blank"><u>here</u></a> and the @ethbooster Twitter account will post a tweet.
      </p>
      <div class="border border-gray-600 rounded-xl p-3 my-3 text-gray-300">
        {{ depositTx.transactionHash }}
      </div>
      <p>
        You can cancel your deposit at any time. In that case it would also be nice to let people know.<br>
        <br>
        <span @click="reset" class="cursor-pointer"><u>back</u></span>
      </p>
    </div>
    <div v-else class="relative">
      <input type="text" v-model="url" class="w-full rounded-3xl border-4 px-10 py-5 text-4xl text-center border-gray-300 relative z-10" placeholder="https://github.com/..." />
      <div v-if="issue" class="flex flex-col items-center justify-center relative z-0">
        <h1 class="text-3xl text-gray-600 text-center mb-10 -mt-10 pt-14 pb-4 px-4 border-2 border-gray-300 rounded-3xl">{{ issue.title }}</h1>
        <div class="flex items-center space-x-5 md:w-full lg:w-3/4 xl:w-1/2">
          <input type="number" min="0" v-model.number="amount" class="w-full rounded-3xl border-4 px-6 py-5 text-4xl text-center border-gray-300" />
          <span class="text-4xl text-gray-700">ETH</span>
        </div>
        <button @click="deposit(issue.node_id)" :disabled="!amount || waitingForConfirmation" class="bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed w-full mt-10 text-white text-4xl px-10 py-5 rounded-3xl whitespace-nowrap">
          <span v-if="waitingForConfirmation">
            <i class="fas fa-circle-notch fa-spin"></i> Waiting for Confirmation
          </span>
          <span v-else>Deposit</span>
        </button>
      </div>
      <div class="space-y-3 text-center">
        <button @click="getDeposits" class="mt-5 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-xl">
          <i v-if="loadingDeposits" class="fas fa-circle-notch fa-spin"></i> load your existing deposits
        </button>
        <div v-for="deposit in deposits" class="flex space-x-3 justify-between p-3 border-2 border-gray-300 rounded-xl">
          <div>
            {{ deposit.issueId }}<br>
            {{ ethers.utils.formatEther(deposit.value) }} ETH
          </div>
          <button @click="cancelDeposit(deposit.id)" class="bg-red-800 hover:bg-red-900 text-white px-3 py-2 rounded-xl">
            <i v-if="waitingForCancelConfirmation == deposit.id" class="fas fa-circle-notch fa-spin"></i>
            <span v-else>cancel</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { ethers } from 'ethers'

const url = ref('')
const issue = ref(null)
const amount = ref(0)
const ethereumEnabled = ref(!!window.ethereum)
const deposits = ref([])
const depositTx = ref(null)
const waitingForConfirmation = ref(false)
const waitingForCancelConfirmation = ref(null)
const loadingDeposits = ref(false)

const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()
const contractAddress = '0x4dfA9e8224fF26e35b7A5843F1238b04425710b8'
const abi = [
  'function getDepositIdsBySender() view returns(uint256[])',
  'function getDepositById(uint256) view returns(address sender,string issueId,uint256 value)',
  'function deposit(string) payable',
  'function cancel(uint256)',
  'function withdraw(string,address)'
]
const contract = new ethers.Contract(contractAddress, abi, ethProvider)
const contractWithSigner = contract.connect(ethSigner)

const getDeposits = async () => {
  await ethProvider.send('eth_requestAccounts', [])
  loadingDeposits.value = true
  deposits.value = []
  const depositIds = await contractWithSigner.getDepositIdsBySender()
  depositIds.forEach(async depositId => {
    const deposit = await contractWithSigner.getDepositById(depositId)
    if (deposit.value > 0) {
      deposits.value.push({
        id: depositId,
        issueId: deposit.issueId,
        value: deposit.value
      })
    }
  })
  loadingDeposits.value = false
}

const deposit = async (issueId) => {
  if (!issueId) return
  waitingForConfirmation.value = true
  await ethProvider.send('eth_requestAccounts', [])
  const tx = await contractWithSigner.deposit(issueId, { value: ethers.utils.parseEther(amount.value.toString()) })
  depositTx.value = await tx.wait()
  waitingForConfirmation.value = false
}

const cancelDeposit = async (depositId) => {
  await ethProvider.send('eth_requestAccounts', [])
  waitingForCancelConfirmation.value = depositId
  try {
    const tx = await contractWithSigner.cancel(depositId)
    await tx.wait()
    getDeposits()
  } finally {
    waitingForCancelConfirmation.value = null
  }
}

const reset = () => {
  url.value = ''
  issue.value = null
  amount.value = 0
  depositTx.value = null
  getDeposits()
}

watchEffect(async () => {
  const urlParts = url.value.match(/^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/issues\/(\d+)$/)
  if (urlParts) {
    const response = await fetch(`https://api.github.com/repos/${urlParts[1]}/${urlParts[2]}/issues/${urlParts[3]}`)
    issue.value = await response.json()
  } else {
    issue.value = null
  }
})
</script>