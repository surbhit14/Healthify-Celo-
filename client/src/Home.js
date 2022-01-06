import { useContext} from 'react';
import { UserContext } from "./UserContext";
import {useHistory } from 'react-router-dom';

function Home() {

    
    let history=useHistory();
    const {id,address,web3,contract}= useContext(UserContext);
    const rd=async()=>{
        // const t= await contract.methods.check(address).call()
        // console.log(t)

        const t=await contract.methods.Identify().call();
        console.log(t);
        if(t==0)
        history.push("/register")
        else if(t==1)
        history.push("/patient")
        else if(t==2)
        history.push("/doctor")
    }
    return (

        <div>
            This is the home page
            {id}
            <button
            onClick={rd}
            >Get Started</button>
            
        </div>
    )
}

export default Home
