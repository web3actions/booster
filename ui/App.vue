<template>
  <div class="h-screen flex flex-col justify-center items-center max-w-md px-3 mx-auto">
    <h1 class="font-extrabold text-4xl font-brand text-gray-300 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
      <span class="text-indigo-700">eth</span>booster
    </h1>
    <Suspense>
      <template #default>
        <Main />
      </template>
      <template #fallback>
        <div class="text-center">
          <svg class="animate-spin text-gray-300 h-12 w-12 my-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div class="text-sm text-gray-300">connecting...</div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Main from './components/Main.vue'
</script>
