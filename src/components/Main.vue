<template>
  <div class="container mx-auto py-10 px-4 md:px-8 grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <Issue />
    <Issue />
    <Issue />
    <Issue />
    <Issue />
    <Issue />
    <Issue />
    <Issue />
    <Issue />
  </div>
  <div class="text-center mb-10">
    <button class="text-xl text-gray-800 bg-gray-100 hover:bg-gray-50 px-4 py-2 rounded-3xl font-bold shadow-md">
      load more
    </button>
  </div>
</template>

<script setup>
import Issue from './Issue.vue'
</script>