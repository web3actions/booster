import { ethers } from 'ethers'
import { crypto } from '../package.json'
import ABI from '../contract/abi.json'

const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
const ethSigner = ethProvider.getSigner()
const bareContract = new ethers.Contract(crypto.ethereum.contract, ABI, ethProvider)
const contract = bareContract.connect(ethSigner)

const connectWallet = async () => {
  await ethProvider.send('eth_requestAccounts', [])
}

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther

export { ethProvider, ethSigner, contract, connectWallet, parseEther, formatEther }