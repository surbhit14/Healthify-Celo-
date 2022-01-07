import { useContext,useState,useEffect} from 'react';
import { UserContext } from "./UserContext";
import test2 from "./contract/Test2.json"
let ContractKit = require("@celo/contractkit")

function Doctor() {
    const {address,web3,contract1}= useContext(UserContext);
 
    const [name, setName] = useState("")
    const [addr, setAddr] = useState("")

    let contract
    let uid

      const getPatient=async(pid)=>{
        let kit = ContractKit.newKitFromWeb3(web3)
        contract=new kit.web3.eth.Contract(test2,"0x6499cb27999Ec4a90339f3895a87b3a084392F20")
        const t=await contract.methods.getPatientInfo_Doc(pid).call()
        return t;
    }

    const getTreatment=async(tid)=>{
        let kit = ContractKit.newKitFromWeb3(web3)
        contract=new kit.web3.eth.Contract(test2,"0x6499cb27999Ec4a90339f3895a87b3a084392F20")
        const t=await contract.methods.getTreatmentDetails(tid).call()
        return t;
    }

    const getBalance = async function () {
        let kit = ContractKit.newKitFromWeb3(web3)
        const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
        const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
        console.log(cUSDBalance)
      }
    
    const getDetail=async()=>{
        console.log(address);
    let kit = ContractKit.newKitFromWeb3(web3)
    contract=new kit.web3.eth.Contract(test2,"0x6499cb27999Ec4a90339f3895a87b3a084392F20")
    const t=await contract.methods.Identify().call();
    
    console.log(contract)
    if(t!=0){
        uid=await contract.methods.addresstoId(address).call();
        console.log(web3);
        const res= await contract.methods.getDoctorInfo(uid).call();
        setName(res[0])
        setAddr(res[1])
        console.log(res)
       
    }
    }

    // getDetail()
    useEffect(async()=>{
        if(web3)
        getDetail()
    }, [])
    return (
        <div>
            {address}
            {name}
            {addr}

            <button
            onClick={addDoctor}
        >
            Add Doctor
        </button>
           
        </div>
        
    )
}

export default Doctor