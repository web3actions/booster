<template>
  <div
    v-if="issue"
    class="w-full rounded-xl p-5 bg-white border"
  >
    <div class="pb-5 mb-5 text-center">
      <div class="text-3xl mb-5 pb-5 text-gray-900 font-extrabold">
        {{ formatEther(issue.balance) }} ETH
      </div>
      <div class="text-sm text-gray-500">
        {{ issue.repository.owner.login }}/{{ issue.repository.name }}
      </div>
      <div class="text-xl text-gray-800">
        {{ issue.title }}
      </div>
      <div class="mt-5 text-gray-400">
        Status:
        <div v-if="issue.closed" class="text-red-700 text-center font-extrabold text-xl">
          closed
        </div>
        <div v-else class="text-green-700 text-center font-extrabold text-xl">
          open
        </div>
      </div>
    </div>
    <button
      v-if="issue.closed"
      class="w-full bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md"
    >
      Withdraw
    </button>
    <div v-else class="relative">
      <span class="absolute right-3 top-3 text-gray-400 text-lg">ETH</span>
      <input
        v-model="amount"
        type="text"
        placeholder="0.0"
        class="w-full px-5 py-3 mb-3 text-xl rounded-xl border-0 ring-gray-300 ring-2 focus:ring-indigo-600 focus:ring-4 transition-all"
      />
      <button
        @click="deposit"
        :disabled="!Number(amount) || waitingForConfirmation"
        class="w-full bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg v-if="waitingForConfirmation" class="animate-spin h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Deposit
      </button>
    </div>
  </div>
  <input
    v-else-if="user && address"
    v-model="url"
    :disabled="loadingIssue"
    type="text"
    placeholder="https://github.com/..."
    :class="[{ 'animate-pulse': loadingIssue }, 'w-full px-5 py-3 text-xl rounded-xl border-0 ring-gray-300 ring-2 focus:ring-indigo-600 focus:ring-4 transition-all']"
  />
  <div class="space-x-3 text-center" v-else>
    <div class="text-lg text-gray-600 font-bold mb-3">Connect:</div>
    <a
      v-if="!user"
      href="https://github.com/login/oauth/authorize?client_id=0365a5d8c08091191dd0"
      class="bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md inline-block"
    >
      GitHub
    </a>
    <button
      v-if="!address"
      @click="connectWallet"
      class="bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md inline-block"
    >
      Wallet
    </button>
  </div>
</template>

<script setup>
import { ethers } from 'ethers'
import { ref, watchEffect } from 'vue'
import {
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
} from '../lib'

await loadAccessToken()
await loadUser(accessToken.value)
await loadAddress()

// fetch issue
const url = ref('')
watchEffect(async () => {
  const issueUrl = url.value.match(/^https:\/\/github\.com\/([\w-]+)\/([\w-\.]+)\/issues\/(\d+)$/)
  if (issueUrl) {
    await loadIssue(accessToken.value, issueUrl[1], issueUrl[2], Number(issueUrl[3]))
  }
})

const amount = ref('')
const depositTx = ref(null)
const waitingForConfirmation = ref(false)
const deposit = async () => {
  waitingForConfirmation.value = true
  try {
    const pendingTx = await contract.deposit(issue.value.id, { value: parseEther(amount.value) })
    depositTx.value = await pendingTx.wait()
    waitingForConfirmation.value = false
    amount.value = ''
    await loadIssue(accessToken.value, issue.value.repository.owner.login, issue.value.repository.name, Number(issue.value.number))
  } catch {
    waitingForConfirmation.value = false
  }
}

</script>
