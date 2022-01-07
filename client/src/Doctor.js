import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import test2 from "./contract/Test2.json";

import Layout from "./components/Layout";
let ContractKit = require("@celo/contractkit");

function Doctor() {
  const pidInputRef = useRef();
  const didInputRef = useRef();
  const diagnosisInputRef = useRef();
  const billInputRef = useRef();
  const medicineInputRef = useRef();

  const { address, web3, contract1 } = useContext(UserContext);

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  let contract;
  let uid;

  function addTreatment() {
    var pid = pidInputRef.current.value;
    var did = didInputRef.current.value;
    var diagnosis = diagnosisInputRef.current.value;
    var bill = billInputRef.current.value;
    var medicine = medicineInputRef.current.value;

    console.log(pid, did, diagnosis, bill, medicine);

    // Call API to create patient
  }

  const getPatient = async (pid) => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0x6499cb27999Ec4a90339f3895a87b3a084392F20"
    );
    const t = await contract.methods.getPatientInfo_Doc(pid).call();
    return t;
  };

  const getTreatment = async (tid) => {
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0x6499cb27999Ec4a90339f3895a87b3a084392F20"
    );
    const t = await contract.methods.getTreatmentDetails(tid).call();
    return t;
  };

  //   const getBalance = async function () {
  //     let kit = ContractKit.newKitFromWeb3(web3);
  //     const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
  //     const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
  //     console.log(cUSDBalance);
  //   };

  const getDetail = async () => {
    console.log(address);
    let kit = ContractKit.newKitFromWeb3(web3);
    contract = new kit.web3.eth.Contract(
      test2,
      "0x6499cb27999Ec4a90339f3895a87b3a084392F20"
    );
    const t = await contract.methods.Identify().call();

    console.log(contract);
    if (t != 0) {
      uid = await contract.methods.addresstoId(address).call();
      console.log(web3);
      const res = await contract.methods.getDoctorInfo(uid).call();
      setName(res[0]);
      setAddr(res[1]);
      console.log(res);
    }
  };

  // getDetail()
  useEffect(() => {
    if (web3) getDetail();
  }, []);

  return (
    <Layout>
      <div className="text-center">
        {address}
        {name}
        {addr}

        {/* <button onClick={addDoctor}>Add Doctor</button> */}
      </div>

      <section>
        <div className="text-dark container" style={{ paddingTop: "150px" }}>
          <div className="mb-5 d-flex justify-content-between  align-items-center">
            <h1 className="font-weight-bold text-white">
              Create a Treatment Record
            </h1>
          </div>
          <section className="pb-5 mb-5">
            <form>
              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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
              className="mt-3 btn btn-block btn-lg text-dark font-weight-bold btn-primary p-3"
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
