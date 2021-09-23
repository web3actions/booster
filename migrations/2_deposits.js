const Deposits = artifacts.require('Deposits')

module.exports = async function (deployer, network, accounts) {
  const workflowHash = "f1d158ce109a88657534eb2d7f6ae65d07e6c5d4"
  await deployer.deploy(Deposits, workflowHash, accounts[1])
}