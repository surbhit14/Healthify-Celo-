import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import test2 from "./contract/Test.json";
let ContractKit = require("@celo/contractkit");
let erc20Abi = require("./erc20Abi.json");
const ERC20_DECIMALS = 18
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
function Patient() {
  const { address, web3, contract1 } = useContext(UserContext);

  const [did, setDid] = useState(0);
  // const [uid, setUid] = useState(0);
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phn, setPhn] = useState(0);
  const [bld, setBld] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorDet, setDoctorDet] = useState([]);
  const [treatmentDet, setTreatmentDet] = useState([]);
  const [balances, setBalances] = useState({cUSD: 0});

  var contract;
  var uid;
  const addDoctor = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    uid = await contract.methods.addresstoId(address).call();
    console.log(uid)
    console.log(did)
    console.log(contract);
    
    const t = await contract.methods.addDoctor_Patient(did,uid).send({
      from: address,
    });

    setDoctors([...doctors,did])
    

  };

  const getDoctor = async () => {
    let kit = ContractKit.newKitFromWeb3(web3)
    var arr=[]
    contract=new kit.web3.eth.Contract(test2,"0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C")
        doctors.forEach(async (i) => {
        var x=await contract.methods.getDoctorInfo(i).call();
        // console.log(x);
        arr.push(x)
      });
      setDoctorDet(arr)
      console.log(doctorDet)
  };



  const getTreatment = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    var arr=[]
    treatments.forEach(async (i) => {
      var x=await contract.methods.getTreatmentDetails(i).call();
      // console.log(x);
      arr.push(x)
    });
    setTreatmentDet(arr)
    console.log(treatmentDet)
  };

    const getBalance = async function () {
      let kit = ContractKit.newKitFromWeb3(web3);
      const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
      const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
      
      console.log(totalBalance)
      setBalances({
          cUSD: cUSDBalance
        })
    };

  const getDetail = async () => {
    console.log(address);
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    const t = await contract.methods.Identify().call();

    console.log(contract);
    if (t != 0) {
      uid = await contract.methods.addresstoId(address).call();
      console.log(web3);
      const res = await contract.methods.getPatientInfo(uid).call();
      setName(res[0]);
      setAddr(res[1]);
      setPhn(res[2]);
      setBld(res[3]);
      setTreatments(res[4]);
      setDoctors(res[5]);
      console.log(res);
   
      getBalance();
      console.log("abc")
      // await getDoctor(101);
      // await getDoctor();
    }
  };

  // getDetail()
  useEffect(async () => {
    if (web3) getDetail();
  },[address]);

  return (
    <div>
      <div className="text-secondary text-left m-5">
        <div>
          <h1 className="fw-bold">Patient</h1>
          <h5>{name}</h5>
        </div>
        <div>
          <h1 className="fw-bold">Address</h1>
          <h5>{addr}</h5>
        </div>
        <div>
          <h1 className="fw-bold">Phone</h1>
          <h5>{phn}</h5>
        </div>
      </div>
      <br />

      <ul>
        <li>CELO BALANCE IN ACCOUNT: {balances.CELO}</li>
        <li>cUSD BALANCE IN ACCOUNT: {balances.cUSD}</li>
      </ul>
      <button className="btn btn-primary mx-5" onClick={getDoctor}>
          Get Doctor
        </button>

        <button className="btn btn-primary mx-5" onClick={getTreatment}>
          Get Treatments
        </button>
      <div className="text-secondary m-5">
        Your Doctors
        {doctors}
        {/* {doctors.map((did) => getDoctor(did))} */}
        <div className="d-flex">
          <div className="d-flex align-items-center justify-content-center">
            <div className="mt-4 mx-5 btn text-left card card-body bg-dark text-white rounded col-3">
              <div>
                <div>
                  <h2 className="bg-black text-left p-2 rounded font-weight-bold">
                    Dr. Ram Kumar
                  </h2>
                  <h5 className="p-2">Complete the dashboard integration</h5>
                  <p className="p-2 badge ">Fabian Ferno</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mx-5 btn text-left card card-body bg-dark text-white rounded col-3">
              <div>
                <div>
                  <h2 className="bg-black text-left p-2 rounded font-weight-bold">
                    Dr. Ram Kumar
                  </h2>
                  <h5 className="p-2 ">Complete the dashboard integration</h5>
                  <p className="p-2 badge">Fabian Ferno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        Your Treatments
        <div className="d-flex">
          <div className="d-flex align-items-center justify-content-center">
            <div className="mt-4 mx-5 btn text-left card card-body bg-dark text-white rounded col-3">
              <div>
                <div>
                  <h2 className="bg-black text-left p-2 rounded font-weight-bold">
                    Dr. Ram Kumar
                  </h2>
                  <h5 className="p-2">Complete the dashboard integration</h5>
                  <p className="p-2 badge ">Fabian Ferno</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mx-5 btn text-left card card-body bg-dark text-white rounded col-3">
              <div>
                <div>
                  <h2 className="bg-black text-left p-2 rounded font-weight-bold">
                    Dr. Ram Kumar
                  </h2>
                  <h5 className="p-2 ">Complete the dashboard integration</h5>
                  <p className="p-2 badge">Fabian Ferno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-white">Enter Doctor Id</h1>
        <input
          type="text"
          value={did}
          onChange={(e) => setDid(e.target.value)}
        />
        <button className="btn btn-primary mx-5" onClick={addDoctor}>
          Add Doctor
        </button>
      </div>
    </div>
  );
}

export default Patient;
