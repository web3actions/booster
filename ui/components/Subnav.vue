<template>
  <div class="text-right text-sm text-gray-300 mt-2 space-x-3">
    <a href="#" class="hover:text-indigo-700" @click="store.dispatch('revokeAccessToken')">logout</a>
    <a href="#" class="hover:text-indigo-700">about</a>
    <a href="#" class="hover:text-indigo-700" @click="toggleShowDeposits">my deposits</a>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const toggleShowDeposits = async () => {
  store.commit('setShowDeposits', !store.state.showDeposits)
  await store.dispatch('loadDeposits')
}
</script>