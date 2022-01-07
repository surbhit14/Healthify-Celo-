import { useContext,useEffect,useState} from 'react';
import { UserContext } from "./UserContext";
import {useHistory } from 'react-router-dom';
let ContractKit = require("@celo/contractkit")

function Register() {
    const {address,web3,contract}= useContext(UserContext);
    let history=useHistory();
    const register= async function () {
    const receipt=await contract.methods.addPatientInfo(25,"fifrefel","adefefr5",20,"A+").send({
        from:address
    })
    console.log(receipt)
}

    
    const reg=function(){
        history.push('/patient');
    }


return (
        <div>
            {address}
            Register

            <button
            onClick={register}
        >
            Register
        </button>

        <button
            onClick={reg}
        >
            Profile
        </button>
        </div>

       
    )
    }

export default Register
