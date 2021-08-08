<template>
  <div class="modal bg-white bg-opacity-50 fixed flex items-center justify-center top-0 left-0 w-full h-screen z-50">
    <div class="max-w-xl bg-gradient-to-br from-indigo-1100 to-gray-900 text-white shadow-2xl rounded-3xl p-5 relative">
      <button @click="$emit('close')" class="absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <slot />
    </div>
  </div>
</template>