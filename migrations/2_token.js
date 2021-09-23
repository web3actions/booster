const Web3ActionsToken = artifacts.require('Web3ActionsToken')
const Airdrop = artifacts.require('Airdrop')

module.exports = async function (deployer) {
  await deployer.deploy(Web3ActionsToken)
  const token = await Web3ActionsToken.deployed()
  await token.mint('0x27711f9c07230632F2EE1A21a967a9AC4729E520', '510000000000000000000000')
  
  await deployer.deploy(Airdrop, token.address, 'f6826ea69302a41379e9be7763b260c3d89c858f')
  const airdrop = await Airdrop.deployed()
  await token.mint(airdrop.address, '490000000000000000000000')
}