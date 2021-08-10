<template>
  <teleport to="body">
    <TransitionRoot
      :show="showIssueModal"
      as="template"
      enter="transition-opacity duration-500"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-500"
      leave-from="opacity-100"
      leave-to="opacity-0"
      @after-leave="setIssue(null); setSearch('')"
    >
      <div @click="setShowIssueModal(false)" class="modal bg-white bg-opacity-50 fixed flex items-center justify-center top-0 left-0 w-full h-screen z-50">
        <TransitionChild
          as="template"
          enter="transform transition-all duration-500"
          enter-from="scale-90 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transform transition-all duration-500"
          leave-from="scale-100 opacity-100"
          leave-to="scale-90 opacity-0"
        >
          <div @click.stop class="max-w-xl shadow-2xl rounded-3xl relative">
            <button @click="setShowIssueModal(false)" class="absolute top-4 right-4 z-50 text-white bg-white bg-opacity-10 hover:bg-opacity-100 hover:text-indigo-800 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Issue :issue="issue" />
            <OwnDeposits />
          </div>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </teleport>
</template>

<script setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { mapGetters, mapMutations } from '../lib'
import Issue from './Issue.vue'
import OwnDeposits from './OwnDeposits.vue'

const { issue, showIssueModal } = mapGetters()
const { setIssue, setSearch, setShowIssueModal } = mapMutations()
</script>