<template>
  <div v-if="issue" class="container max-w-4xl mx-auto py-10 px-4 md:px-8">
    <Issue :issue="issue" />
  </div>
  <IssueList v-else />
</template>

<script setup>
import { mapGetters } from '../lib'
import Issue from './Issue.vue'
import IssueList from './IssueList.vue'

const { issue } = mapGetters()
</script>