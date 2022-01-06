import React, { useState,useEffect} from 'react';
import { UserContext } from "./UserContext";
// import Navbar from './components/Navbar';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from "./Register"
import Doctor from "./Doctor"
import Patient from "./Patient"
import test2 from "./contract/Test5.json"

let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")
// let BigNumber = require("bignumber.js")
let erc20Abi = require("./erc20Abi.json")


function App() {
  
  // const [id, setId] = useState(0)
  const [address, setAddress] = useState()
  const [web3, setWeb3] = useState(undefined)
  const [contract,setContract]=useState([])

  function update(x){
    setId(x);
  }
  let kit
let cUSDcontract
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

  const connectCeloWallet = async function () {
    if (window.celo) {
      try {
 
        await window.celo.enable()
        const web3 = new Web3(window.celo)
                   // Check the Celo network ID
    // const networkId = await web3.eth.net.getId()

    // // Get the contract associated with the current network
    // const deployedNetwork = test.networks[networkId]
        kit = ContractKit.newKitFromWeb3(web3)
        const accounts = await kit.web3.eth.getAccounts()
        kit.defaultAccount = accounts[0]
        
        // const Vault=new kit.web3.eth.Contract(test.abi,"0xecEFEcf20Df6cc4954205Ef211a428eAc8C2A6Ed")

        const contr=new kit.web3.eth.Contract(test2,"0x1bFeb3BdF6606dfB3BD1D5A91Ab2A2ABb2C5c76A")
        console.log(kit.defaultAccount)
        setWeb3(web3)
        // const i=await contr.methods.addresstoId(kit.defaultAccount).call();
        setAddress(kit.defaultAccount)
        setContract(contr)
        cUSDcontract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)
      } catch (error) {
        console.log(`⚠️ ${error}.`)
      }
    } else {
      console.log("⚠️ Please install the CeloExtensionWallet.")
    }
  }

  useEffect(connectCeloWallet, [])

  return (
    <>
      <Router>
        <Switch>
        <UserContext.Provider value={{address,web3,contract}}>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/patient' exact component={Patient} />
          <Route path='/doctor' exact component={Doctor} />
          
          </UserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
