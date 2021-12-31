import React, { useState} from 'react';
import { UserContext } from "./UserContext";
import Doctorlist from "./Doctorlist"
let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")
// let BigNumber = require("bignumber.js")
let erc20Abi = require("./erc20Abi.json")

const ERC20_DECIMALS = 18
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

let kit
let cUSDcontract
function Appcelo() {
    const connectCeloWallet = async function () {
        if (window.celo) {
          try {
            await window.celo.enable()
            const web3 = new Web3(window.celo)
            kit = ContractKit.newKitFromWeb3(web3)
            const accounts = await kit.web3.eth.getAccounts()
            kit.defaultAccount = accounts[0]
            console.log(kit.defaultAccount)
            cUSDcontract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)
            getBalance()
          } catch (error) {
            console.log(`⚠️ ${error}.`)
          }
        } else {
          console.log("⚠️ Please install the CeloExtensionWallet.")
        }
      }
      
      async function send() {
        // let celoAddress = document.getElementById("addr").value
        let sendamount
        const web3 = new Web3(window.celo)
        sendamount = amount
        sendamount = web3.utils.toWei(sendamount, 'ether');
        console.log(sendamount)
        const result = await cUSDcontract.methods
          .transfer(address, sendamount)
          .send({ from: kit.defaultAccount })
        
        getBalance()
        showTxHash(result.transactionHash) 
        return result
      }
      
      const getBalance = async function () {
        const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
        const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
        console.log(cUSDBalance)
        setBalances({
            cUSD: cUSDBalance
          })

     
      }
      
      const showTxHash = async function(transactionHash){
        let link = `https://alfajores-blockscout.celo-testnet.org/tx/${transactionHash}`
        // document.querySelector("#txHash").textContent = link
        // document.getElementById("txHash").href = link
      }

      const [balances, setBalances] = useState({ CELO: 0, cUSD: 0});
      const [amount, setAmount] = useState()
      const [address, setAddress] = useState()
      
    return (
        <UserContext.Provider value={[address, setAddress]}>
        <div>
            <button onClick={connectCeloWallet }>
        Connect extension
          </button>
          <ul>
        <li>CELO BALANCE IN ACCOUNT: {balances.CELO}</li>
        <li>cUSD BALANCE IN ACCOUNT: {balances.cUSD}</li>
      </ul>
      <h1>Send Amount</h1>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="number" value={amount} min="0" onChange={(e) => setAmount(e.target.value)} />
          <button onClick={send}>send</button>
        </div>

        <Doctorlist/>
        </UserContext.Provider>
    )
}

export default Appcelo
