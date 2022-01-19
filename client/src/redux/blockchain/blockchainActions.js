// constants
import Web3 from "web3";
import test2 from "../../contract/Test2.json";
// log
// import { fetchData } from "../data/dataActions";
let ContractKit = require("@celo/contractkit");

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        var kit = ContractKit.newKitFromWeb3(web3);
        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        const contract = new kit.web3.eth.Contract(
          test2,
          "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
        );

        const t = await contract.methods.Identify().call();
        const id= await contract.methods.addresstoId(accounts[0]).call();
    var user=""
    switch (t) {
      case "0":
        user="new"
        break;
      case "1":
        user="patient"
        break;
      case "2":
        user="doctor"
        break;
      default:
        user="new"
        break;
    }

        dispatch(
          connectSuccess({
            account: accounts[0],
            id:id,
            contract: contract,
            web3: web3,
            user:user
          })
        );
      } catch (error) {
        console.log(`⚠️ ${error}.`);
      }
    } else {
      console.log("⚠️ Please install the CeloExtensionWallet.");
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
