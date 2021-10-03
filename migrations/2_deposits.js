const Deposits = artifacts.require('Deposits')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Deposits, accounts[1])
}