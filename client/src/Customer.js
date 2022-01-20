import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/customerData/customerDataActions";

function Customer() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.customerData);
      const getDetails = async () => {
        var x=blockchain.contract.methods.getCustomerInfo().call();
        console.log(x)
        console.log(data)
      }; 


      useEffect(() => {
        if (blockchain.account !== "" && blockchain.contract !== null) {
          dispatch(fetchData(blockchain.account));
        }
      }, [blockchain.contract, blockchain.account]);


    return (
        <div>
            <button
                type="button"
                className="btn btn-lg d-block btn-primary my-3 fw-bold text-start"
                onClick={() => getDetails()}
              >
                Get Details
              </button>
        </div>
    )
}

export default Customer
