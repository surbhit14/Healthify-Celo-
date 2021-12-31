import { useContext} from 'react';
import { UserContext } from "./UserContext";
import {useHistory } from 'react-router-dom';

function Home() {
    let history=useHistory();
    const {address,web3,contract}= useContext(UserContext);
    const rd=async()=>{
        const t= await contract.methods.check(address).call()
        console.log(t)
        if(t)
        history.push("/dashboard")
        else
        history.push("/register")
    }
    return (

        <div>
            This is the home page
            {address}
            <button
            onClick={rd}
            >Go to Dashboard</button>
            
        </div>
    )
}

export default Home
