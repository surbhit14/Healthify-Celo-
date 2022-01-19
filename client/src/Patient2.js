import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/patientData/patientDataActions";

function Patient2() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.patientData);
      const getDoctor = async () => {

        console.log(data)
      }; // getDoctor


      useEffect(() => {
        if (blockchain.account !== "" && blockchain.godToken !== null) {
          dispatch(fetchData(blockchain.account));
        }
      }, [blockchain.contract, blockchain.account]);


    return (
        <div>
            <button
                type="button"
                className="btn btn-lg d-block btn-primary my-3 fw-bold text-start"
                onClick={() => getDoctor()}
              >
                Get Doctor
              </button>
        </div>
    )
}

export default Patient2
