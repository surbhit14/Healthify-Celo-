// constants
import Web3 from "web3";
import test2 from "../../contract/Test2.json";
// log

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
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const contract = new web3.eth.Contract(
            test2,
            // "0x5413AFD56EDF70cfF1bf5DF94B1c66DfFE682011"
            "0x4aF0662472826697fE73f896698d27902638Cd23"
          );
          console.log(accounts)
          console.log(contract)
          

          const t = await contract.methods.Identify().call();
          console.log("t is ",t)
        // const id= await contract.methods.addresstoId(accounts[0]).call();
    // var user=""
    // switch (t) {
    //   case 0:
    //     user="new"
    //     break;
    //   case 1:
    //     user="customer"
    //     break;
    //   case 2:
    //     user="bank"
    //     break;
    //   default:
    //     user="new"
    //     break;
    // }

    dispatch(
      connectSuccess({
        account: accounts[0],
        // id:id,
        contract: contract,
        web3: web3
      })
    );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
