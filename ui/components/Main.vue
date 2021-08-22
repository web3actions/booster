<template>
  <div v-if="store.state.showDeposits" class="w-full rounded-xl bg-white border relative overflow-hidden shadow-lg">
    <button @click="() => store.commit('setShowDeposits', false)" class="absolute top-3 right-3 rounded-full p-1 bg-white text-opacity-50 hover:text-opacity-90 bg-opacity-10 text-white hover:bg-opacity-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white text-center p-5">
      <div class="text-3xl font-extrabold py-3">
        My Deposits
      </div>
    </div>
    <div v-if="store.state.deposits.length" class="p-5">
      <Suspense>
        <template #default>
          <Deposit v-for="deposit in store.state.deposits" :deposit="deposit" />
        </template>
        <template #fallback>
          <div class="text-center">
            <svg class="animate-spin text-gray-300 h-9 w-9 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </template>
      </Suspense>
    </div>
    <div v-else class="text-center p-5">No deposits.</div>
  </div>
  <div v-else-if="store.state.issue" class="w-full">
    <div class="w-full rounded-xl bg-white border relative overflow-hidden shadow-lg">
      <button @click="resetIssue" class="absolute top-3 right-3 rounded-full p-1 bg-white text-opacity-50 hover:text-opacity-90 bg-opacity-10 text-white hover:bg-opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white text-center p-5">
        <div class="text-3xl font-extrabold">
          {{ ethers.utils.formatEther(issueBalance) }} ETH
        </div>
        <div class="text-2xl text-white opacity-30 font-extrabold">
          ${{ issueBalanceUsd.toFixed(2) }}
        </div>
      </div>
      <div class="p-5 text-center">
        <a :href="store.state.issue.url" target="__blank" class="rounded-2xl hover:bg-gray-100 inline-block p-3">
          <div class="text-sm text-gray-500">
            {{ store.state.issue.repository.owner.login }}/{{ store.state.issue.repository.name }}/{{ store.state.issue.number }}
          </div>
          <div class="text-2xl text-gray-800">
            {{ store.state.issue.title }}
          </div>
        </a>
        <div class="mt-5 text-gray-400 text-center font-extrabold text-xl">
          <div v-if="store.state.issue.closed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 inline-block text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg><br>
            <span class="text-gray-900 text-xl font-extrabold">closed</span>
          </div>
          <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 inline-block text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg><br>
            <span class="text-gray-900 text-xl font-extrabold">open</span>
          </div>
        </div>
      </div>
      <div v-if="store.state.issue.closed" class="p-5">
        <a
          v-if="issueBalance != 0"
          :href="getWithdrawLink(store.state.issue)"
          target="__blank"
          class="w-full inline-block text-center bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md"
        >
          Withdraw
        </a>
        <div
          v-else
          class="w-full inline-block text-center bg-indigo-700 text-white text-xl font-extrabold rounded-xl px-5 py-3 shadow-md cursor-not-allowed opacity-30"
        >
          Withdraw
      </div>
      </div>
      <div v-else class="m-5">
        <div v-if="store.state.depositTx" class="p-3 bg-green-600 rounded-xl mb-3 text-white relative">
          <button @click="() => store.commit('setDepositTx', null)" class="absolute top-3 right-3 rounded-full p-1 bg-white text-opacity-50 hover:text-opacity-90 bg-opacity-10 text-white hover:bg-opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="font-extrabold mb-3">Deposit successful.</div>
          Don't forget to share a link to the bounty and comment on the issue back at GitHub.
          <button class="relative w-full truncate bg-green-700 border border-green-500 hover:bg-green-800 rounded-xl pl-3 pr-10 py-2 mt-3 hover:shadow-md">
            <span>https://ethbooster.github.io/#/{{ store.state.issue.repository.owner.login }}/{{ store.state.issue.repository.name }}/{{ store.state.issue.number }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-2 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <div class="mt-3 space-x-3 text-right">
            <a :href="store.state.issue.url" target="__blank" class="text-green-900 bg-white hover:bg-gray-100 rounded-2xl px-3 py-2 inline-block shadow">
              <i class="fab fa-github" />
            </a>
            <a :href="'https://twitter.com/intent/tweet?text=asd'" target="__blank" class="text-green-900 bg-white hover:bg-gray-100 rounded-2xl px-3 py-2 inline-block shadow">
              <i class="fab fa-twitter" />
            </a>
            <a :href="'https://etherscan.io/tx/' + store.state.depositTx" target="__blank" class="text-green-900 bg-white hover:bg-gray-100 rounded-2xl px-3 py-2 inline-block shadow">
              View on Etherscan
            </a>
          </div>
        </div>
        <div class="relative">
          <span class="absolute right-3 top-3 text-gray-400 text-lg">ETH</span>
          <input
            v-model="amount"
            type="text"
            placeholder="0.0"
            class="w-full px-5 py-3 mb-3 text-xl rounded-xl border-0 ring-gray-300 ring-2 focus:ring-indigo-600 focus:ring-4 transition-all"
          />
        </div>
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
  </div>
  <input
    v-else
    v-model="url"
    :disabled="loadingIssue"
    type="text"
    placeholder="https://github.com/.../.../issues/1"
    :class="[{ 'animate-pulse': loadingIssue }, 'w-full px-5 py-3 text-xl rounded-xl border-0 ring-gray-300 ring-2 focus:ring-indigo-600 focus:ring-4 transition-all']"
  />
  <Subnav />
</template>

<script setup>
import { ethers, BigNumber } from 'ethers'
import { useStore } from 'vuex'
import { ref, computed, watchEffect } from 'vue'
import Deposit from './Deposit.vue'
import Subnav from './Subnav.vue'

const store = useStore()
await store.dispatch('loadAddress')
await store.dispatch('loadDeposits')

// fetch issue
const url = ref('')
const loadingIssue = ref(false)
watchEffect(async () => {
  const issueUrl = url.value.match(/^https:\/\/github\.com\/([\w-]+)\/([\w-\.]+)\/issues\/(\d+)$/)
  if (issueUrl) {
    loadingIssue.value = true
    await store.dispatch(
      'loadIssue',
      {
        owner: issueUrl[1],
        repo: issueUrl[2],
        number: Number(issueUrl[3])
      }
    )
    loadingIssue.value = false
  }
})

// get issue params from url
const urlParams = window.location.hash.match(/^#([\w-]+)\/([\w-\.]+)\/(\d+)$/)
if (urlParams) {
  url.value = `https://github.com/${urlParams[1]}/${urlParams[2]}/issues/${urlParams[3]}`
}

const resetIssue = () => {
  store.commit('setIssue', null)
  url.value = ''
}

const amount = ref('')
const waitingForConfirmation = ref(false)
const deposit = async () => {
  waitingForConfirmation.value = true
  await store.dispatch('deposit', amount.value)
  waitingForConfirmation.value = false
}

const getWithdrawLink = (issue) => {
  return `https://github.com/ethbooster/ethbooster.github.io/issues/new?labels=withdraw&template=withdraw.yml&title=Withdraw&issue=${store.state.issue.url}`
}

const issueBalance = computed(() => {
  const balance = store.state.issue.deposits.reduce((balance, deposit) => {
    return balance.add(BigNumber.from(deposit.value))
  }, BigNumber.from(0))
  return balance
})

const issueBalanceUsd = computed(() => {
  if (store.state.ethUsdPrice) {
    return store.state.ethUsdPrice * issueBalance.value / Math.pow(10, 26)
  }
  
  return null
})

store.dispatch('loadEthUsdPrice')
setInterval(() => {
  store.dispatch('loadEthUsdPrice')
}, 10000)
</script>
