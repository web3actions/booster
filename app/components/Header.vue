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
        <div class="space-x-5">
          <a href="#" class="text-gray-400 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="https://twitter.com/ethbooster" target="_blank" class="text-gray-400 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="https://github.com/ethbooster" target="_blank" class="text-gray-400 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>
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