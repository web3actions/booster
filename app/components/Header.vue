<template>
  <div class="px-8 py-5 bg-gradient-to-br from-indigo-1100 via-gray-900 to-gray-800 text-white text-xl">
    <div class="container mx-auto ">
      <div class="flex justify-between items-center">
        <h1 class="font-extrabold text-4xl font-brand text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <span class="text-indigo-700">eth</span>booster
        </h1>
      </div>
      <div class="py-8 md:py-14 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8 justify-between items-center">
        <div>
          <h2 class="font-extrabold text-4xl md:text-5xl text-gray-200 mb-3">Create bounties in seconds.</h2>
          <h2 class="text-2xl md:text-3xl text-gray-500">Boost any GitHub issue with any amount of ETH.</h2>
          <div class="mt-5 flex space-x-5 text-sm sm:text-lg">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500 border-2 border-gray-500 rounded-full p-1 text-xs font-bold">1%</span>
              <span class="text-gray-200">Success Fee</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <span class="text-gray-200">Smart Contract</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </span>
              <span class="text-gray-200">No Registration</span>
            </div>
          </div>
        </div>
        <div class="flex space-x-5 md:flex-col md:space-y-5 md:space-x-0 xl:flex-row xl:space-y-0 xl:space-x-5 text-center whitespace-nowrap">
          <a href="#" class="bg-gray-200 hover:bg-gray-50 text-gray-800 rounded-3xl px-5 py-3 text-2xl font-extrabold shadow-lg">
            Donate!
          </a>
          <a href="#" class="bg-indigo-800 hover:bg-indigo-700 text-gray-200 rounded-3xl px-5 py-3 text-2xl font-extrabold shadow-lg">
            Read more
          </a>
        </div>
      </div>
    </div>
  </div>
</template>