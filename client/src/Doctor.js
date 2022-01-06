import { useContext} from 'react';
import { UserContext } from "./UserContext";

function Doctor() {

    const {address,web3,contract}= useContext(UserContext);

    const getDetail=async()=>{
        // const t= await contract.methods.check(address).call()
        // console.log(t)

        // const res=await contract.methods.getDoctorInfo(id).call();
        
        
    }
    useEffect(getDetail, [])
    return (
        <div>
            
        </div>
    )
}

export default Doctor
