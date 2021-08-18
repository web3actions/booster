<template>
  <div
    v-if="issue"
    class="w-full text-xl font-extrabold rounded-xl p-5 border"
  >
    <div class="pb-5 mb-5 border-b text-gray-800">
      {{ issue.title }}
    </div>
    <button
      class="w-full bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md"
    >
      Deposit
    </button>
  </div>
  <input
    v-else-if="user && address"
    v-model="url"
    :disabled="loadingIssue"
    type="text"
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

</script>
