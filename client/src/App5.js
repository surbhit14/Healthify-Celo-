
import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv'
import Vault from './contract/Vault.json'
import Web3 from "web3";
import { newKitFromWeb3,CeloContract } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
const kit = newKitFromWeb3(web3);

// LOAD ENV VA
dotenv.config()

console.log(process.env.REACT_APP_VAULT_ADDRESS)
const VaultO = new kit.web3.eth.Contract(Vault.abi, process.env.REACT_APP_VAULT_ADDRESS)

function App() {

  const [balances, setBalances] = useState({ CELO: 0, cUSD: 0});
  const connect = async() => {
   
    const nm= await VaultO.methods.getsender()
    console.log("Sender is "+nm)
    console.log(nm)
    getBalanceHandle()
  }


  const update = () => {
    // console.log(process.env.REACT_APP_PRIVATE_KEY)
    getBalanceHandle()
  }

  const getBalanceHandle = async () => {
    const goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    // const totalLockedBalance = await VaultO.methods.getTokenTotalLockedBalance(goldtoken._address).call()
    // const totalBalance = await kit.getTotalBalance(process.env.REACT_APP_ADDRESS)

    let CELO = await goldtoken.balanceOf("0xE557258304CC26B53067d8d4e5abde59B1F4CB3d")
    let cUSD = await stabletoken.balanceOf("0xE557258304CC26B53067d8d4e5abde59B1F4CB3d")
    // console.log(process.env.REACT_APP_VAULT_ADDRESS)
    // console.log(process.env.REACT_APP_ADDRESS)

    // const { CELO, cUSD } = totalBalance
    setBalances({
      CELO: kit.web3.utils.fromWei(CELO.toString()),
      cUSD: kit.web3.utils.fromWei(cUSD.toString()),
      // Vault: kit.web3.utils.fromWei(totalLockedBalance.toString())
    })

  }

  useEffect(update, [])
  return (
    <div>
      <h1>DATA WALLET</h1>
      <ul>
      <button onClick={connect}>Click here to connect your wallet</button>
        <li>CELO BALANCE IN ACCOUNT: {balances.CELO}</li>
        <li>cUSD BALANCE IN ACCOUNT: {balances.cUSD}</li>
      </ul>
    </div>
  );
}

export default App;