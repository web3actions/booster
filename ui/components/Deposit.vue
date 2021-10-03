<template>
  <div class="flex justify-between items-center space-x-3">
    <div>
      <a :href="deposit.issue.url" target="__blank" class="hover:bg-gray-100 inline-block px-3 py-2 rounded-xl">
        <div class="text-gray-400 text-xs">
          {{ deposit.issue.repository.owner.login }}/{{ deposit.issue.repository.name }}/{{ deposit.issue.number }}
        </div>
        <div class="text-gray-600">
          {{ deposit.issue.title }}
        </div>
      </a>
    </div>
    <div class="text-2xl font-extrabold text-center">
      {{ ethers.utils.formatEther(deposit.value.toString()) }} ETH
    </div>
    <svg v-if="waitingForConfirmation" class="animate-spin h-14 w-14 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <button
      v-else-if="deposit.withdrawalRound === deposit.issue.withdrawalRound"
      class="bg-gray-100 text-white hover:bg-red-600 rounded-full p-1"
      @click="cancel"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <span v-else class="bg-green-100 text-green-900 rounded-xl px-3 py-2">
      claimed
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ethers } from 'ethers'

const props = defineProps({
  deposit: {
    type: Object,
    required: true
  }
})

const store = useStore()

const waitingForConfirmation = ref(false)
const cancel = async () => {
  waitingForConfirmation.value = true
  await store.dispatch('cancelDeposit', props.deposit.id)
  waitingForConfirmation.value = false
}
</script>