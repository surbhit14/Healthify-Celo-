import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import test2 from "./contract/Test.json";

import Layout from "./components/Layout";
let ContractKit = require("@celo/contractkit");
let erc20Abi = require("./erc20Abi.json");
const ERC20_DECIMALS = 18;
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function Doctor() {
  const pidInputRef = useRef();
  const didInputRef = useRef();
  const diagnosisInputRef = useRef();
  const billInputRef = useRef();
  const medicineInputRef = useRef();

  const { address, web3, contract1 } = useContext(UserContext);

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [prt, setPrt] = useState("");
  const [aoe, setAoe] = useState("");
  const [pno, setPno] = useState(0);
  const [patients, setPatients] = useState([]);
  const [patientDet, setPatientDet] = useState([]);
  const [balances, setBalances] = useState({ cUSD: 0 });

  let contract;
  let uid;

  async function addTreatment() {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );

    var pid = pidInputRef.current.value;
    var did = didInputRef.current.value;
    var diagnosis = diagnosisInputRef.current.value;
    var bill = billInputRef.current.value;
    var medicine = medicineInputRef.current.value;

    const t = await contract.methods
      .TreatPatient(pid, diagnosis, bill, medicine)
      .send({
        from: address,
      });
    console.log(pid, did, diagnosis, bill, medicine);

    // Call API to create patient
  }

  const getPatient = async () => {
    let kit = ContractKit.newKitFromWeb3(web3);
    var arr = [];
    contract = new kit.web3.eth.Contract(
      test2,
      "0xaAc86611a1AF8cFf09a0b8074fa429dA58D5Fe0C"
    );
    patients.forEach(async (i) => {
      var x = await contract.methods.getPatientInfo_Doc(i).call();
      // console.log(x);
      arr.push(x);
    });
    setPatientDet(arr);
    console.log(patientDet);
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
    console.log(t);
    console.log(contract);
    if (t != 0) {
      uid = await contract.methods.addresstoId(address).call();
      console.log(web3);
      const res = await contract.methods.getDoctorInfo(uid).call();
      setName(res[0]);
      setAddr(res[4]);
      setPrt(res[1]);
      setAoe(res[2]);
      setPno(res[3]);
      setPatients(res[5]);
      console.log(res);
      getBalance();
    }
  };

  useEffect(() => {
    if (web3) getDetail();
  }, [address]);

  return (
    <Layout>
      <dive className="mt-5 pt-5 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary mx-5" onClick={getPatient}>
          Get Patient Detials
        </button>
      </dive>

      <section>
        <div className="text-dark container" style={{ paddingTop: "150px" }}>
          <div className="mb-5 d-flex justify-content-between  align-items-center">
            <h1 className="fw-bold text-white">Create a Treatment Record</h1>
          </div>
          <section className="pb-5 mb-5">
            <form>
              <div className="form-group my-4">
                <label htmlFor="inputPatient" className="text-secondary">
                  Patient Id
                </label>
                <input
                  ref={pidInputRef}
                  type="number"
                  className="p-3 d-flex bg-dark text-white  rounded focus-none"
                  style={{ width: "100%" }}
                  id="inputPatient"
                  placeholder="Patient Id - Eg. 12345"
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="inputDoctor" className="text-secondary">
                  Doctor Id
                </label>
                <input
                  ref={didInputRef}
                  type="number"
                  className="p-3 d-flex bg-dark text-white  rounded focus-none"
                  style={{ width: "100%" }}
                  id="inputDoctor"
                  placeholder="Doctor Id - Eg. 12345"
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="inputDiagnosis" className="text-secondary">
                  Diagnosis
                </label>
                <input
                  ref={diagnosisInputRef}
                  type="text"
                  className={
                    "p-3 d-flex bg-dark text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDiagnosis"
                  placeholder="Diagnosis - Eg. Fever"
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="inputBill" className="text-secondary">
                  Bill
                </label>
                <input
                  ref={billInputRef}
                  type="number"
                  className={
                    "p-3 d-flex bg-dark text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputBill"
                  placeholder="Bill - Eg. 100"
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="inputMedicine" className="text-secondary">
                  Mediciine
                </label>
                <input
                  ref={medicineInputRef}
                  type="text"
                  className={"p-3 d-flex bg-dark text-white rounded focus-none"}
                  style={{ width: "100%" }}
                  id="inputMedicine"
                  placeholder="Medicine - Eg. Paracetamol"
                />
              </div>
            </form>

            <div
              onClick={() => addTreatment()}
              className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
            >
              Add Treatment and Proceed ✅
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}

export default Doctor;
