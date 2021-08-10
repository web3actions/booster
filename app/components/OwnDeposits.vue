<template>
  <div class="pt-10 -mt-10 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
    <h3 class="font-extrabold text-white p-5 ml-5 flex space-x-5 text-2xl">
      Deposits
    </h3>
    <div class="bg-white bg-opacity-5 rounded-3xl m-5 mt-0 shadow-md p-2">
      <div v-for="issue in issues" class="flex items-center justify-between">
        <a href="#" class="hover:bg-white hover:bg-opacity-5 rounded-2xl truncate flex-grow px-3 pb-2 pt-1 mr-3 flex items-center justify-between">
          <div class="truncate">
            <h1 class="truncate text-white text-xl font-bold">
              0x27711f9c07230632F2EE1A21a967a9AC4729E520
            </h1>
            <div class="text-sm text-white text-opacity-50 font-normal">
              Tue 10, Aug 2021 05:11
            </div>
          </div>
          <div class="ml-auto pl-4 text-xl text-white text-opacity-95 md:text-2xl font-bold whitespace-nowrap">
            {{ ethers.utils.formatEther(issue.bounty) }} ETH
          </div>
        </a>
        <button class="text-white bg-white bg-opacity-10 hover:bg-opacity-100 hover:bg-red-700 rounded-full p-1 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ethers } from 'ethers'
import { mapGetters } from '../lib'

const { issues } = mapGetters()
</script>