import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv'
import Vault from './contract/Vault.json'
// import Web3 from 'web3';
// import ContractKit from "@celo/contractkit";
// import { newKitFromWeb3, CeloContract } from "@celo/contractkit";

import Web3 from "web3";
import { newKitFromWeb3,CeloContract } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
const kit = newKitFromWeb3(web3);

// LOAD ENV VA
dotenv.config()

const bal=async ()=>{
  let accounts = await kit.web3.eth.getAccounts()
  kit.defaultAccount = accounts[0]
  await kit.setFeeCurrency(CeloContract.StableToken)
  let totalBalance = await kit.getTotalBalance(process.env.REACT_APP_ADDRESS)
console.log(totalBalance)
}

bal();

// paid gas in cUSD





// const web3 = new Web3(`https://alfajores-forno.celo-testnet.org`)
// const kit = ContractKit.newKitFromWeb3(web3)


// const account = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY)

// console.log(account)

// kit.connection.addAccount(account.privateKey)
// kit.defaultAccount = account.address


//const kit = newKit(process.env.REACT_APP_DATAHUB_NODE_URL)
//const connectAccount = kit.addAccount(process.env.REACT_APP_PRIVATE_KEY)

// const account = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY)
// kit.connection.addAccount(account.privateKey)
// kit.defaultAccount = account.address
// CONTRACT INSTANCE
const VaultO = new kit.web3.eth.Contract(Vault.abi, process.env.REACT_APP_VAULT_ADDRESS)

function App() {

  const [balances, setBalances] = useState({ CELO: 0, cUSD: 0, Vault: 0 });
  const [info, setinfo] = useState("")
  const [lockAmount, setlockAmount] = useState("0.3")
  const [idVault, setIdVault] = useState("0")
  const [listOfVaults, setlistOfVaults] = useState([])

  const update = () => {
    console.log(process.env.REACT_APP_PRIVATE_KEY)
    getBalanceHandle()
    //getLockerIdsInfo()
  }

  const getBalanceHandle = async () => {
    const goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    // const totalLockedBalance = await VaultO.methods.getTokenTotalLockedBalance(goldtoken._address).call()
    // const totalBalance = await kit.getTotalBalance(process.env.REACT_APP_ADDRESS)

    let CELO = await goldtoken.balanceOf(process.env.REACT_APP_ADDRESS)
    let cUSD = await stabletoken.balanceOf(process.env.REACT_APP_ADDRESS)

    // const { CELO, cUSD } = totalBalance
    setBalances({
      CELO: kit.web3.utils.fromWei(CELO.toString()),
      cUSD: kit.web3.utils.fromWei(cUSD.toString()),
      // Vault: kit.web3.utils.fromWei(totalLockedBalance.toString())
    })

  }

  let anAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

async function getBalances(){

    // Get the token contracts
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()

    // Get token balances of anAddress
    let celoBalance = await goldtoken.balanceOf(anAddress)
    let cUSDBalance = await stabletoken.balanceOf(anAddress)

    // Print balances
    console.log(`${anAddress} CELO balance: ${kit.web3.utils.fromWei(celoBalance.toString(), "ether")}`)
    console.log(`${anAddress} cUSD balance: ${kit.web3.utils.fromWei(cUSDBalance.toString(), "ether")}`)
}

  const approve = async () => {
    setinfo('')
    // MAX ALLOWANCE
    const allowance = kit.web3.utils.toWei('1000000', 'ether')
    // GAS ESTIMATOR
    const gasEstimate = kit.gasEstimate
    // ASSET TO ALLOW
    const goldtoken = await kit.contracts.getGoldToken()
    // TX OBJECT AND SEND
    try {
      const approveTxo = await goldtoken.methods.approve(process.env.REACT_APP_VAULT_ADDRESS, allowance)
      const approveTx = await kit.sendTransactionObject(approveTxo, { from: process.env.REACT_APP_ADDRESS, gasPrice: gasEstimate })
      const receipt = await approveTx.waitReceipt()
      // PRINT TX RESULT
      console.log(receipt); setinfo('Aproved!!')
    } catch (err) {
      console.log(err); setinfo(err.toString())

    }
  }

  const lock = async () => {
    setinfo('')
    try {
      // TIMESTAMP
      const lastBlock = await kit.web3.eth.getBlockNumber()
      let { timestamp } = await kit.web3.eth.getBlock(lastBlock)
      var timestampObj = new Date(timestamp * 1000)
      // TIME TO LOCK + 10 MINS
      var unlockTime = timestampObj.setMinutes(timestampObj.getMinutes() + 10) / 1000 // 10 minutes by default
      // AMMOUNT TO LOCK
      const amount = kit.web3.utils.toWei(lockAmount + "", 'ether')
      // ERC20 TO LOCK
      const goldtoken = await kit.contracts.getGoldToken()
      // TX OBJECT AND SEND
      const txo = await VaultO.methods.lockTokens(goldtoken._address, process.env.REACT_APP_ADDRESS, amount, unlockTime)
      const tx = await kit.sendTransactionObject(txo, { from: process.env.REACT_APP_ADDRESS })
      // PRINT TX RESULT
      const receipt = await tx.waitReceipt()
      update()
      setinfo('Celo locked!'); console.log(receipt);
    } catch (err) {
      console.log(err); setinfo(err.toString())
    }
  }

  const withdraw = async () => {
    setinfo('')
    try {
      const txo = await VaultO.methods.withdrawTokens(idVault)
      console.log(process.env.REACT_APP_ADDRESS)
      const tx = await kit.sendTransactionObject(txo, { from: process.env.REACT_APP_ADDRESS })
      const receipt = await tx.waitReceipt()
      update()
      console.log(receipt); 
      setinfo('Celo unlocked!')
    } catch (err) {
      console.log(err); setinfo(err.toString())
    }
  }

  const getLockerIdsInfo = async () => {
    setinfo('')
    try {
      const ids = await VaultO.methods.getVaultsByWithdrawer(process.env.REACT_APP_ADDRESS).call()
      let vaults = []
      for (let id of ids) vaults.push([id, ...(await VaultO.methods.getVaultById(id).call())])
      console.log("IDS:", vaults); setlistOfVaults(vaults)
    } catch (err) {
      console.log(err); setinfo(err.toString())
    }
  }

  useEffect(update, [])

  return (
    <div>
      <h1>ACTIONS:</h1>
      <button onClick={approve}>APPROVE</button>
      <button onClick={getBalanceHandle}>GET BALANCE</button>
      <button onClick={getLockerIdsInfo}>GET LOCKER IDS</button>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: '0.5rem' }}>
          <h1>Lock Celo Token:</h1>
          <input type="number" value={lockAmount} min="0" onChange={(e) => setlockAmount(e.target.value)} />
          <button onClick={lock}>LOCK</button>
        </div>
        <div style={{ margin: '0.5rem' }}>
          <h1>Widthdraw Celo Token:</h1>
          <input type="number" value={idVault} min="0" onChange={(e) => setIdVault(e.target.value)} />
          <button onClick={withdraw}>WITHDRAW</button>
        </div>
      </div>
      <h1>DATA WALLET</h1>
      <ul>
        <li>CELO BALANCE IN ACCOUNT: {balances.CELO}</li>
        <li>cUSD BALANCE IN ACCOUNT: {balances.cUSD}</li>
        <li>TOTAL VALUE LOCKED IN CONTRACT: {balances.Vault}</li>
      </ul>
      <h1>INFO:</h1>
      <h2 style={{ color: 'red' }}>{info}</h2>
      <h2>Your Vaults:</h2>
      <table>
        <thead>
          <th>ID</th><th>Value</th><th>Withdraw until</th><th>Withdrawn</th><th>deposited</th>
        </thead>
        <tbody>
          {listOfVaults.map(item => <tr>
            <td>{item[0]}</td>
            <td>{kit.web3.utils.fromWei(item[3].toString())}</td>
            <td>{new Date(item[4] * 1000).toLocaleTimeString()}</td>
            <td>{item[5] ? 'yes' : 'no'}</td>
            <td>{item[6] ? 'yes' : 'no'}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;