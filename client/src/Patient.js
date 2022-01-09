import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import test2 from "./contract/Test.json";
import Layout from "./components/Layout";
let ContractKit = require("@celo/contractkit");
let erc20Abi = require("./erc20Abi.json");
const ERC20_DECIMALS = 18;
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

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
  const [balances, setBalances] = useState({ cUSD: 0 });

  var contract;
  var uid;
  const addDoctor = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    uid = await contract.methods.addresstoId(address).call();
    console.log(uid);
    console.log(did);
    console.log(contract);

    const t = await contract.methods.addDoctor_Patient(did, uid).send({
      from: address,
    });

    setDoctors([...doctors, did]);
  };

  const getDoctor = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    var doctorDetailsArray = [];
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    doctors.forEach(async (i) => {
      var x = await contract.methods.getDoctorInfo(i).call();
      // console.log(x);
      doctorDetailsArray.push(x);
    });
    setDoctorDet(doctorDetailsArray);
    console.log(doctorDet);
  };

  const getTreatment = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    var treatmentDetailsArray = [];
    treatments.forEach(async (i) => {
      var x = await contract.methods.getTreatmentDetails(i).call();
      // console.log(x);
      treatmentDetailsArray.push(x);
    });
    setTreatmentDet(treatmentDetailsArray);
    console.log(treatmentDet);
  };

  const getBalance = async function () {
    let kit = ContractKit.newKitFromWeb3(web3);
    const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
    const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    console.log(totalBalance);
    setBalances({
      cUSD: cUSDBalance,
    });
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
      console.log("abc");
      // await getDoctor(101);
      // await getDoctor();
    }
  };

  // getDetail()
  useEffect(async () => {
    if (web3) getDetail();
  }, [address]);

  return (
    <Layout>
      <div className="mt-5 container">
        <div className="d-md-flex d-block align-items-start justify-content-center">
          <div className="m-3 rounded col-md-4 col-12 card card-body bg-black">
            <div className="d-md-flex d-block">
              <div className="col-md-4 col-12 overflow-hidden">
                <img src="https://picsum.photos/500/400" alt="" srcset="" />
              </div>
              <div className="col-md-8 col-12">
                <div className="text-secondary text-start m-5">
                  <div>
                    <h6>Patient</h6>
                    <h3 className="fw-bold text-primary">{name}</h3>
                  </div>
                  <div className="my-5">
                    <h6>Address</h6>
                    <h3 className="fw-bold text-primary">{addr}</h3>
                  </div>
                  <div>
                    <h6>Phone</h6>
                    <h3 className="fw-bold text-primary">{phn}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-3 p-5 rounded col-md-3 col-12 card card-body bg-black  ">
            <div className="text-secondary text-start ">
              <div className="my-4">
                <h6>CELO Balance</h6>
                <h3 className="fw-bold text-primary">
                  {!balances.CELO && "Couldn't Get CELO Balance"}
                </h3>
              </div>
              <div>
                <h6>cUSD Balance</h6>
                <h3 className="fw-bold text-primary">{balances.cUSD}</h3>
              </div>
              <button
                type="button"
                className="btn btn-lg d-block btn-primary my-3 fw-bold"
                onClick={getDoctor}
              >
                Get Doctor
              </button>

              <button
                type="button"
                className="btn btn-lg d-block btn-primary my-3  fw-bold"
                onClick={getTreatment}
              >
                Get Treatments
              </button>
            </div>
          </div>
        </div>

        <hr className="text-secondary" />

        <div className="text-secondary m-5">
          <div className="d-md-flex d-block">
            <section className="me-5  mt-5 col-md-4 col-12">
              <h5 className=" pb-3">Your Doctors</h5>
              <div className="d-block">
                <div className="mt-3 btn text-start card card-body bg-black text-white rounded ">
                  <div>
                    <h2 className="bg-primary text-black text-start p-2 rounded fw-bold">
                      Dr. Ram Kumar
                    </h2>
                    <h5 className="p-2">Cardiologist</h5>
                    <h6 className="p-2 text-secondary">DID #01</h6>
                  </div>
                </div>
                <div className="mt-3 btn text-start card card-body bg-black text-white rounded ">
                  <div>
                    <h2 className="bg-primary text-black text-start p-2 rounded fw-bold">
                      Dr. Stephen Strange
                    </h2>
                    <h5 className="p-2">Neurologist</h5>
                    <h6 className="p-2 text-secondary">DID #02</h6>
                  </div>
                </div>
              </div>
            </section>

            <section className="me-5 mt-5 col-md-4 col-12">
              <h5 className=" pb-3">Your Treatments</h5>
              <div className="d-block">
                <div className="mb-5 btn text-start card card-body bg-black text-white rounded ">
                  <h3 className="fw-bold text-primary mb-4 text-end">
                    DID #04
                  </h3>
                  <div className="mt-0">
                    <p>Diagnosis</p>
                    <h2 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      Common Cold
                    </h2>
                  </div>
                  <div className="mt-4">
                    <p>Prescription</p>
                    <h3 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      Dolo 650
                    </h3>
                  </div>
                  <div className="mt-4">
                    <p>Bill Amount</p>
                    <h5 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      Rs. 250
                    </h5>
                  </div>
                </div>

                <div className="mb-5 btn text-start card card-body bg-black text-white rounded ">
                  <h3 className="fw-bold text-primary mb-4 text-end">
                    DID #04
                  </h3>
                  <div className="mt-0">
                    <p>Diagnosis</p>
                    <h2 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      COVID19
                    </h2>
                  </div>
                  <div className="mt-4">
                    <p>Prescription</p>
                    <h3 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      CoVaxin
                    </h3>
                  </div>
                  <div className="mt-4">
                    <p>Bill Amount</p>
                    <h5 className="border-bottom border-primary text-white text-start p-2 rounded fw-bold">
                      Rs. 25000
                    </h5>
                  </div>
                </div>
              </div>
            </section>
            <section className="me-5 mt-5 col-md-2 col-12 ">
              <h5 className="pb-3">Add Doctor with ID Number</h5>
              <div className="d-block">
                <input
                  type="number"
                  className="bg-dark p-3 text-white rounded"
                  value={did}
                  onChange={(e) => setDid(e.target.value)}
                />
                <button
                  type="button"
                  className="mt-2 btn btn-primary btn-lg d-block fw-bold"
                  onClick={addDoctor}
                  style={{ width: "100%" }}
                >
                  Add Doctor ➕
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Patient;
