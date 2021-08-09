<template>
  <div class="shadow-md bg-white">
    <div class="container mx-auto relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 top-6 left-5 opacity-20 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" v-model="search" placeholder="Enter issue link, label or language" class="w-full py-5 pl-20 pr-32 text-4xl border-0 focus:ring-0 font-light placeholder-gray-500 focus:placeholder-gray-300" />
      <button @click="toggleOnlyOwn" class="top-6 right-20 opacity-40 absolute cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="onlyOwn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
      <button @click="toggleSort" class="top-6 right-5 opacity-40 absolute cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="sort == 'desc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { mapGetters, mapMutations } from '../lib'

const { sort, onlyOwn } = mapGetters()
const { toggleSort, toggleOnlyOwn, setIssue } = mapMutations()

const search = ref('')
watchEffect(async () => {
  const issueUrl = search.value.match(/^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/issues\/(\d+)$/)
  if (issueUrl) {
    const response = await fetch(`https://api.github.com/repos/${issueUrl[1]}/${issueUrl[2]}/issues/${issueUrl[3]}`)
    setIssue(await response.json())
  } else {
    setIssue(null)
  }
})

const issueParams = window.location.hash.match(/^#([\w-]+)\/([\w-]+)\/(\d+)$/)
if (issueParams) {
  search.value = `https://github.com/${issueParams[1]}/${issueParams[2]}/issues/${issueParams[3]}`
}
</script>