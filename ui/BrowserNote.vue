<template>
  <div class="h-screen flex flex-col justify-center items-center max-w-full w-96 px-3 mx-auto">
    <h1 class="font-extrabold text-4xl font-brand text-gray-300 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
      <span class="text-indigo-700">eth</span>booster
    </h1>
    <div class="text-center">
      <div class="text-lg">
        Your browser does not support Ethereum.
      </div>
      <a
        href="https://metamask.io"
        target="__blank"
        class="inline-block bg-indigo-700 hover:bg-indigo-900 text-white text-xl font-extrabold rounded-xl px-5 py-3 mt-3 shadow-md"
      >
        Install MetaMask
      </a>
    </div>
  </div>
</template>