import { useContext,useState,useEffect} from 'react';
import { UserContext } from "./UserContext";

function Patient() {
    const {address,web3,contr}= useContext(UserContext);
    kit = ContractKit.newKitFromWeb3(web3)
    const contract=new kit.web3.eth.Contract(test2,"0x1bFeb3BdF6606dfB3BD1D5A91Ab2A2ABb2C5c76A")
    const [name, setName] = useState("")
    const [addr, setAddr] = useState("")

    let uid
    const getDetail=async()=>{
        uid=await contract.methods.addresstoId(address).call();
        const res= await contract.methods.getPatientInfo(uid).call();
        setName(res[0])
        setAddr(res[1])
        console.log(res)
    }


    useEffect(getDetail, [])
    return (
        <div>
            {address}
            {name}
            {addr}
        </div>
    )
}

export default Patient
