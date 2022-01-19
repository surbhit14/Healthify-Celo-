import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
import {useHistory } from "react-router-dom";
// import { fetchData } from "./redux/data/dataActions";

function Home2() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    var history = useHistory();
    
    const rd = async () => {
      console.log("clicked")
        if(!blockchain.loading){
          console.log("inside")
            var t=blockchain.user;
            console.log(t)
            switch (t) {
                  case "new":
                    history.push("/register");
                    break;
                  case "patient":
                    history.push("/patient");
                    break;
                  case "doctor":
                    history.push("/doctor");
                    break;
                  default:
                    history.push("/");
                    break;
                }
            
        }
      };

    
      useEffect(() => {
        console.log("called")
          dispatch(connect());
      }, []);

    return (
        <div>
            <h3>Home Page</h3>
            <button
                onClick={() => rd()}
              >
                Get Started
              </button>

        </div>
    )
}

export default Home2
