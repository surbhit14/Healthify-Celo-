import { useContext,useState,useEffect} from 'react';
import { UserContext } from "./UserContext";
import test2 from "./contract/Test2.json"
let ContractKit = require("@celo/contractkit")

function Patient() {
    const {address,web3,contract1}= useContext(UserContext);
 
    const [name, setName] = useState("")
    const [addr, setAddr] = useState("")
    const [contract, setContract] = useState(contract1)

    let uid
    

    const addDoctor=async()=>{
        console.log(contract);
    }

    // const getDoctor=async()=>{
    //     console.log(address);
    // }

    // const getTreatment=async()=>{
    //     console.log(address);
    // }

    const getDetail=async()=>{
        console.log(address);
    let kit = ContractKit.newKitFromWeb3(web3)
    const ct=new kit.web3.eth.Contract(test2,"0x6499cb27999Ec4a90339f3895a87b3a084392F20")
    setContract(ct)
    const t=await contract.methods.Identify().call();

    if(t!=0){
        uid=await contract.methods.addresstoId(address).call();
        console.log(web3);
        const res= await contract.methods.getPatientInfo(uid).call();
        setName(res[0])
        setAddr(res[1])
        console.log(res)
    }
    }

    // getDetail()
    useEffect(async()=>{
        if(web3)
        getDetail()
    }, [contract])
    return (
        <div>
            {address}
            {name}
            {addr}

            <button
            onClick={addDoctor}>
            Add Doctor
        </button>
           
        </div>
        
    )
}

export default Patient