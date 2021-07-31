<template>
  <div class="px-10 mx-auto flex flex-col items-center justify-center min-h-screen sm:w-full md:w-2/3 lg:w-1/2 relative">
    <div v-if="!ethereumEnabled" class="text-red-900 mb-5">
      Ethereum is not supported by your browser. <a href="https://metamask.io"><u>Install MetaMask</u></a>
    </div>
    <input type="text" v-model="url" class="w-full rounded-3xl border-4 px-10 py-5 text-4xl text-center border-gray-300 z-10" placeholder="https://github.com/..." />
    <div v-if="issue" class="flex flex-col items-center justify-center z-0">
      <h1 class="text-3xl text-gray-600 text-center mb-10 -mt-10 pt-14 pb-4 px-4 border-2 border-gray-300 rounded-3xl">{{ issue.title }}</h1>
      <div class="flex items-center space-x-5 md:w-full lg:w-3/4 xl:w-1/2">
        <input type="number" min="0" v-model.number="amount" class="w-full rounded-3xl border-4 px-6 py-5 text-4xl text-center border-gray-300" />
        <span class="text-4xl text-gray-700">ETH</span>
      </div>
      <button @click="deposit(issue.node_id)" :disabled="!amount" class="bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed w-full mt-10 text-white text-4xl px-10 py-5 rounded-3xl">
        Deposit
      </button>
    </div>
    <div class="space-y-3 text-center">
      <button @click="getDeposits" class="mt-5 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-xl">
        load your existing deposits
      </button>
      <div v-for="(deposit, index) in deposits" class="flex space-x-3 p-3 border-2 border-gray-300 rounded-xl">
        <div>
          {{ deposit.issueId }}<br>
          {{ ethers.utils.formatEther(deposit.value) }} ETH
        </div>
        <button @click="cancelDeposit(index)" class="bg-red-800 hover:bg-red-900 text-white px-3 py-2 rounded-xl">
          cancel
        </button>
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

const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()
const contractAddress = '0x510a6f38a35f38eb8ff4708036ac4069b19094c8'
const abi = [
  'function getDeposits() view returns(tuple(string issueId,uint256 value)[])',
  'function deposit(string) payable',
  'function cancel(uint256)',
  'function withdraw(string,address)'
]
const contract = new ethers.Contract(contractAddress, abi, ethProvider)
const contractWithSigner = contract.connect(ethSigner)

const getDeposits = async () => {
  await ethProvider.send('eth_requestAccounts', [])
  const allDeposits = await contractWithSigner.getDeposits()
  deposits.value = allDeposits.filter(d => Number(d.value) > 0)
}

const deposit = async (issueId) => {
  if (!issueId) return
  await ethProvider.send('eth_requestAccounts', [])
  const tx = await contractWithSigner.deposit(issueId, { value: ethers.utils.parseEther(amount.value.toString()) })
}

const cancelDeposit = async (index) => {
  await ethProvider.send('eth_requestAccounts', [])
  const tx = await contractWithSigner.cancel(index)
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