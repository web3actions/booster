<template>
  <div class="bg-gray-900 rounded-3xl text-white p-5">
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
    <p>
      If you deposited at least 0.1 ETH, you can also post the transaction hash <a href="https://github.com/ethbooster/oracle/issues/new?template=tweet.md&title=Tweet" target="__blank"><u>here</u></a> and the @ethbooster Twitter account will post a tweet.
    </p>
    <div class="border border-gray-600 rounded-xl p-3 my-3 text-gray-300">
      {{ depositTx.transactionHash }}
    </div>
    <p>
      You can cancel your deposit at any time. In that case it would also be nice to let people know.<br>
      <br>
      <span @click="reset" class="cursor-pointer"><u>back</u></span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  issue: {
    type: Object,
    default: null
  },
  amount: {
    type: Number,
    default: 0
  },
  depositTx: {
    type: Object,
    default: null
  },
  reset: {
    type: Function,
    default: null
  }
})
</script>