import { useContext,useEffect} from 'react';
import { UserContext } from "./UserContext";

function Dashboard() {
    const {address,web3,contract}= useContext(UserContext);
    const det=async()=>{         
        if(!(typeof address==='undefined'|| address==null))
{const t= await contract.methods.getPatient(address).call()
console.log(t)}
    }

    useEffect(det, [address])
    
    return (
        <div>
            Dashboard
            Username:
            {/* <button
            onClick={det}
            ></button> */}
        </div>
    )
}

export default Dashboard
