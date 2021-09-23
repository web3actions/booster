const Deposits = artifacts.require('Deposits')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Deposits, "6eb10b5d9dec53016a31bdc66f4961bd53d360b9", accounts[1])
}