<template>
  <teleport to="body">
    <TransitionRoot
      :show="show"
      as="template"
      enter="transition-opacity duration-500"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-500"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="modal bg-white bg-opacity-50 fixed flex items-center justify-center top-0 left-0 w-full h-screen z-50">
        <TransitionChild
          as="template"
          enter="transform transition-all duration-500"
          enter-from="scale-90 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transform transition-all duration-500"
          leave-from="scale-100 opacity-100"
          leave-to="scale-90 opacity-0"
        >
          <div class="max-w-xl bg-indigo-800 text-white shadow-2xl rounded-3xl p-5 relative">
            <button @click="$emit('close')" class="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <slot />
          </div>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </teleport>
</template>

<script setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmit(['close'])
</script>