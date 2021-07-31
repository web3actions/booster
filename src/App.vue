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
      <button @click="deposit" :disabled="!amount" class="bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed w-full mt-10 text-white text-4xl px-10 py-5 rounded-3xl">
        Deposit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { ethers } from "ethers"

const url = ref('')
const issue = ref(null)
const amount = ref(0)
const ethereumEnabled = ref(!!window.ethereum)

const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()

const deposit = async () => {
  await ethProvider.send("eth_requestAccounts", [])
  console.log("Account:", await ethSigner.getAddress())
  // const tx = ethSigner.sendTransaction({
  //     to: '0x27711f9c07230632F2EE1A21a967a9AC4729E520',
  //     value: ethers.utils.parseEther(amount.value.toString())
  // })
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