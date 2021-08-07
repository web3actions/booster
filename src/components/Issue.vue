<template>
  <div class="relative bg-gradient-to-r from-gray-100 to-gray-800" style="border-radius: 1.7rem">
    <a href="https://github.com/mktcode/mktcode/issues/3" target="__blank" class="p-5 rounded-3xl shadow-md bg-gradient-to-r from-gray-900 to-gray-800 hover:from-indigo-1100 hover:to-gray-800 text-white block relative z-10">
      <div class="text-gray-400">trezor/trezor-firmware</div>
      <h3 class="font-bold text-xl truncate">{{ issue.title }}</h3>
      <div class="flex space-x-2 mt-1">
        <div class="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs text-gray-300">Vue</div>
        <div v-for="label in issue.labels" class="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs text-gray-300">
          {{ label.name }}
        </div>
      </div>
    </a>
    <div class="rounded-b-3xl shadow-md text-gray-800 relative z-0 -mt-5 pt-5 overflow-hidden">
      <div class="rounded-3xl bg-gray-100 overflow-hidden flex justify-between items-center">
        <div class="text-xl md:text-2xl px-3 font-bold whitespace-nowrap">
          {{ ethers.utils.formatEther(bounty) }} ETH
        </div>
        <div class="flex items-center h-full bg-white rounded-full filter drop-shadow-2xl">
          <input v-model.number="amount" type="number" class="w-full max-w-xs h-full pr-0 border-0 rounded-full text-2xl text-right focus:ring-0" placeholder="+0.00" />
          <i v-if="waitingForConfirmation" class="fas fa-spinner fa-spin text-gray-400 text-2xl p-2 m-1 mx-2 inline-block" />
          <i v-else-if="showSuccess" class="fas fa-check text-green-700 text-2xl p-2 m-1 mx-2 inline-block" />
          <button v-else-if="amount" @click="deposit" class="text-indigo-900 rounded-full p-1 m-1 inline-block hover:text-white hover:bg-indigo-900 hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </button>
          <span v-else class="text-gray-400 rounded-full p-1 m-1 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </span>
        </div>
        <div v-if="bounty" class="p-1 flex">
          <a href="https://github.com/ethbooster/oracle/issues/new?labels=withdraw&template=withdraw.md&title=Withdraw&body=https%3A%2F%2Fgithub.com%2Fmktcode%2Fmktcode%2Fissues%2F3%0A0x27711f9c07230632F2EE1A21a967a9AC4729E520" target="__blank" class="text-indigo-900 rounded-full p-1 inline-block hover:text-white hover:bg-indigo-900 hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </a>
          <a href="https://twitter.com/intent/tweet?text=Earn%200.075%20ETH%20by%20solving%20this%20issue%3A%20https%3A%2F%2Fgithub.com%2Fmktcode%2Fmktcode%2Fissues%2F3%20%23ethbooster%20%23ethereum%20%23opensource%20%23github" target="__blank" class="text-indigo-900 rounded-full p-1 inline-block hover:text-white hover:bg-indigo-900 hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 inline opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m 7.0027808,13.28056 c 0.3781587,0.09097 -1.4858784,0.05887 -1.4858784,0.05887 0,0 0.7349123,2.222575 3.1929439,2.340303 0,0 -1.5233375,1.617877 -5.0730349,1.471608 0,0 3.0127834,2.163711 7.4276076,1.295016 0,0 3.988505,-0.677832 6.136161,-4.532554 0,0 1.384204,-2.088792 1.384204,-5.0320079 0,0 -0.02854,-0.353186 0.338916,-0.6760479 0,0 1.052423,-0.9560994 1.385987,-1.457338 0,0 -1.475176,0.4709145 -1.887226,0.4851847 0,0 1.295015,-1.0595579 1.382419,-1.8693883 0,0 -1.000693,0.5511841 -1.971062,0.7866414 0,0 -0.162323,0.067783 -0.367456,-0.153404 0,0 -0.9561,-1.0880981 -2.811219,-0.8241006 0,0 -2.413437,0.3817262 -2.825487,2.884352 0,0 -0.148053,0.7955604 0.04459,1.266475 0,0 -4.0759091,-0.01427 -7.0779899,-3.590724 0,0 -1.4573381,2.7077591 1.0006936,4.5325536 0,0 -0.4566445,0.146268 -1.4858784,-0.3674564 -0.00178,-0.00357 0.012486,2.7345164 2.6917053,3.3820234 z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body" v-if="showModal && depositTx">
    <Modal @close="closeModal">
      <h1 class="text-3xl font-extrabold mb-5">Deposit Successful!</h1>
      <p>
        One more step. You should <a :href="issue.html_url" target="__blank"><u>leave a comment</u></a> to let everyone know about this bounty. Include a link to the transaction for other's to validate your deposit. Here's a template you can copy:
      </p>
      <div class="border border-gray-600 rounded-xl p-3 my-3 text-gray-300">
        Hey! I just deposited {{ amount }} ETH for this issue. Whoever solves it via a merged pull request. Can withdraw the bounty [here](https://github.com/ethbooster/oracle/issues/new?template=withdraw.md&title=Withdraw)<br>
        <br>
        As the maintainer, comment "/release-eth @user" to release the bounty manually.<br>
        <br>
        You can see the transaction [here](https://kovan.etherscan.io/tx/{{ depositTx.transactionHash }}).
      </div>
    </Modal>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { ethers } from 'ethers'
import Modal from './Modal.vue'
import ABI from '../contract/abi.json'

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
})

const bounty = BigInt('750000000000000000')

const amount = ref('')
const depositTx = ref(null)
const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()
const contractAddress = '0x29E80Eb524F44459B76A67206eDbBa0880851376'
const contract = new ethers.Contract(contractAddress, ABI, ethProvider)
const contractWithSigner = contract.connect(ethSigner)

const waitingForConfirmation = ref(false)
const showSuccess = ref(false)
const showModal = ref(false)
const deposit = async () => {
  showModal.value = true
  waitingForConfirmation.value = true
  try {
    await ethProvider.send('eth_requestAccounts', [])
    const pendingTx = await contractWithSigner.deposit(props.issue.node_id, { value: ethers.utils.parseEther(amount.value.toString()) })
    depositTx.value = await pendingTx.wait()
    showSuccess.value = true
    waitingForConfirmation.value = false
    setTimeout(() => showSuccess.value = false, 3000)
  } catch (e) {
    console.log(e)
    waitingForConfirmation.value = false
  }
}

const closeModal = () => {
  depositTx.value = null
  amount.value = ''
  showModal.value = false
}
</script>