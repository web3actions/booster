<template>
  <div class="shadow-md bg-white">
    <div class="container mx-auto relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 top-6 left-5 opacity-20 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" v-model="search" placeholder="Enter issue link, label or language" class="w-full p-5 pl-20 text-4xl border-0 focus:ring-0 font-light placeholder-gray-500 focus:placeholder-gray-300" />
      <button v-if="sort == 'desc'" @click="toggleSort" class="top-6 right-5 opacity-40 absolute cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      </button>
      <button v-if="sort == 'asc'" @click="toggleSort" class="top-6 right-5 opacity-40 absolute cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { mapGetters, mapMutations } from '../lib'

const { sort } = mapGetters()
const { toggleSort, setIssue } = mapMutations()

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
</script>