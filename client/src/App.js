import React, { useState,useEffect} from 'react';
import { UserContext } from "./UserContext";
// import Navbar from './components/Navbar';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Doctorlist from "./Doctorlist"
import Dashboard from "./Dashboard"
import Register from "./Register"
import test from "./contract/Test.json"
import Pay from "./appcelo.js"
let Web3 = require("web3")
let ContractKit = require("@celo/contractkit")
// let BigNumber = require("bignumber.js")
let erc20Abi = require("./erc20Abi.json")
// import Services from './components/pages/Services';
// import Products from './components/pages/Products';
// import SignUp from './components/pages/SignUp';

function App() {
  const [address, setAddress] = useState()
  const [web3, setWeb3] = useState(undefined)
  const [contract,setContract]=useState([])
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
        
        const Vault=new kit.web3.eth.Contract(test.abi,"0xecEFEcf20Df6cc4954205Ef211a428eAc8C2A6Ed")
        console.log(kit.defaultAccount)
        setWeb3(web3)
        setAddress(kit.defaultAccount)
        setContract(Vault)
        cUSDcontract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)

        // getBalance()
      } catch (error) {
        console.log(`⚠️ ${error}.`)
      }
    } else {
      console.log("⚠️ Please install the CeloExtensionWallet.")
    }
  }

  useEffect(connectCeloWallet, [address])

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Switch>
        <UserContext.Provider value={{address,web3,contract}}>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/pay' exact component={Pay} />
          {/* <Route path='/list' component={Doctorlist} /> */}
          </UserContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
