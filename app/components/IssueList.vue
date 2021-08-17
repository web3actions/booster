<template>
  <div class="container mx-auto py-10 px-4 md:px-8 grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <Issue v-for="issue in issues" :issue="issue" />
  </div>
  <div v-if="issues.length === 0" class="text-2xl text-gray-600 text-center">
      No issues found.
    </div>
  <div class="text-center my-10">
    <button class="text-xl text-gray-800 bg-gray-100 hover:bg-gray-50 px-4 py-2 rounded-3xl font-bold shadow-md">
      load more
    </button>
  </div>
</template>

<script setup>
import { mapState } from '../lib'
import Issue from './Issue.vue'

const { issues } = mapState()
</script>