import { useContext,useEffect,useState} from 'react';
import { UserContext } from "./UserContext";
let ContractKit = require("@celo/contractkit")

function Register() {
    const {id,address,web3,contract,update}= useContext(UserContext);

    const register= async function () {
    const receipt=await contract.methods.addPatientInfo(3,"telly","addr2",20,"A+",5).send({
        from:address
    })
    console.log(receipt)
    // const i=await contract.methods.addresstoId(address).call();
    // update(i)
}

    
//     const register=async()=>{   
// const receipt=await contract.methods.addPatient(address,"telly",20).send({
//     from:address
// })

// console.log(receipt)
// const t= await contract.methods.check(address).call()
// console.log("final "+t)

    
    return (
        <div>
            {address}
            Register

            <button
            onClick={register}
        >
            Register
        </button>
        </div>

       
    )
    }

export default Register
