<template>
  <div class="px-8 py-5 bg-gradient-to-br from-indigo-1100 via-gray-900 to-gray-800 text-white">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <h1 class="font-extrabold text-4xl font-brand text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <span class="text-indigo-700">eth</span>booster
        </h1>
        <div class="space-x-5">
          <a v-if="user" :href="'https://github.com/' + user.login" class="opacity-80 hover:opacity-100 flex items-center">
            Hi {{ user.login }}!
            <img :src="user.avatarUrl" class="w-8 h-8 rounded-xl ml-3" />
          </a>
          <a v-else href="https://github.com/login/oauth/authorize?client_id=0365a5d8c08091191dd0" class="text-sm bg-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl px-3 py-2 font-extrabold shadow-lg">
            connect
          </a>
        </div>
      </div>
      <div class="py-8 md:py-14 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-32 justify-between items-center">
        <div>
          <h2 class="font-extrabold text-4xl md:text-7xl text-gray-200 mb-3">Create bounties.<br>In seconds.</h2>
          <h3 class="text-2xl md:text-3xl text-white opacity-60 mt-5 mb-10">
            Fund issues on GitHub with ETH. Your own ones or any you would like to see solved. As a single donor or together with others.
            Low fees, seamless processing.
          </h3>
          <div class="space-x-5 text-xl">
            <button @click="showCreateBountyModal = true" class="bg-indigo-800 hover:bg-indigo-700 rounded-xl px-5 py-3 font-extrabold shadow-lg">
              Create Bounty
            </button>
            <a href="https://medium.com" target="__blank" class="bg-gray-300 hover:bg-white text-gray-800 rounded-xl px-5 py-3 font-extrabold shadow-lg">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        <div class="w-full max-w-lg">
          <div class="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden">
            <iframe src="https://www.youtube-nocookie.com/embed/8G-1NW5NqO0" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :show="showCreateBountyModal" @close="showCreateBountyModal = false">
    <h1 class="text-3xl font-extrabold mb-5">Creating a bounty is easy!</h1>
    <p>
      Simply paste the link to an issue into the search field. When the issue pops up, enter the amount you want to deposit and click on
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>.
    </p>
    <img src="/create-bounty.gif" class="my-5 rounded-2xl" />
    <p>
      It doesn't matter if you are the first or other deposits already exist. The user who solves the issue can withdraw everything at once.
      <b>You can cancel a deposit at any time.</b> Click on
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="onlyOwn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      in the search bar to see only your own bounties. Make sure you are connected to same Ethereum address than the one you made the deposit with.
    </p>
    <div class="text-center mt-5">
      <button @click="showCreateBountyModal = false" class="text-lg bg-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl px-5 py-2 font-extrabold shadow-lg">
        Got it.
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { mapGetters } from '../lib'
import Modal from './Modal.vue'

const { user } = mapGetters()
const showCreateBountyModal = ref(false)
</script>