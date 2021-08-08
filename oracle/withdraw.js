const ethers = require('ethers')
const checkWithdrawalEligibility = require('./lib/check-withdrawal-eligibility')
const cryptoConfig = require('../package.json').crypto
const ABI = require('../contract/abi.json')

module.exports = async (github, context, rpcNode, walletKey) => {
  // comment request status
  const statusComment = await github.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: 'Processing request...'
  })

  const issueUrlMatch = context.payload.issue.body.match(/\bhttps:\/\/github\.com\/([\w-]+)\/([\w-]+)\/issues\/(\d+)\b/)
  const addressMatch = context.payload.issue.body.match(/\b0x[a-fA-F0-9]{40}\b/)
  let status = 'No valid input.'

  if (issueUrlMatch && addressMatch && ethers.utils.isAddress(addressMatch[0])) {
    const owner = issueUrlMatch[1]
    const repo = issueUrlMatch[2]
    const issue_number = issueUrlMatch[3]
    const address = addressMatch[0]

    const issue = await github.issues.get({ owner, repo, issue_number })
    const canWithdraw = await checkWithdrawalEligibility(github.graphql, context.payload.sender.login, issue.data.node_id)
    if (canWithdraw) {
      // withdraw
      const provider = new ethers.providers.JsonRpcProvider(rpcNode)
      const wallet = new ethers.Wallet(walletKey, provider)
      const contract = new ethers.Contract(cryptoConfig.ethereum.contract, ABI, provider)
      const contractWithWallet = contract.connect(wallet)
      const issueBalance = await contractWithWallet.getIssueBalance(issue.data.node_id)
      if (Number(ethers.utils.formatEther(issueBalance))) {
        try {
          const pendingTx = await contractWithWallet.withdraw(issue.data.node_id, address)
          const confirmedTx = await pendingTx.wait()
          status = `Withdrawal (${ethers.utils.formatEther(issueBalance)} ETH) successful! Tx: ${confirmedTx.transactionHash}`
    
          // comment on issue
          await github.issues.createComment({ issue_number, owner, repo, body: `${ethers.utils.formatEther(issueBalance)} ETH have been withdrawn by @${context.payload.sender.login}. Tx: ${confirmedTx.transactionHash}` })
        } catch {
          status = 'Unexpected error.'
        }
      } else {
        status = 'There is no bounty for this issue.'
      }
    } else {
      status = 'You cannot withdraw anything from this issue. It must be either closed by a pull request from you or manually released to you by a maintainer.'
    }
  }

  // update request status
  github.issues.updateComment({
    comment_id: statusComment.data.id,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: status
  })
  // close request
  github.issues.update({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'closed'
  })
  // lock request
  github.issues.lock({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  })
}