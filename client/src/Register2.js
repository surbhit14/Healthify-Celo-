import { useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";
import { create } from "ipfs-http-client";

const client = create('https://ipfs.infura.io:5001/api/v0');

// let ContractKit = require("@celo/contractkit");

function Register() {

  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain);
  const [formToggle, setFormToggle] = useState(false);
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [aadharUrl, setAadharUrl] = useState(null);
  const [panUrl, setPanUrl] = useState(null);
  // const [urlArr, setUrlArr] = useState([]);
  let history = useHistory();


  const customerNameInputRef = useRef();
  const customerAddressInputRef = useRef();
  const customerPhoneInputRef = useRef();


  const bankNameInputRef = useRef();


  async function createbank() {
    var bankName = bankNameInputRef.current.value;

    const receipt = await blockchain.contract.methods
      .addBankInfo(
        bankName
      )
      .send({
        from: blockchain.account,
      });
    console.log(receipt);

    // Call API to create bank
    history.push("/bank");
  }

  async function retrievePan(e){
    const file = e.target.files[0];
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setPanUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  };

  async function retrieveAadhar(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setAadharUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  };


  async function createcustomer() {
    var customerName = customerNameInputRef.current.value;
    var customerAddress = customerAddressInputRef.current.value;
    var customerPhone = customerPhoneInputRef.current.value;

    
    console.log(aadharUrl)
    console.log(panUrl)

    const receipt = await blockchain.contract.methods
      .addCustomerInfo(
        customerName,
        customerAddress,
        customerPhone,
        aadharUrl,
        panUrl
      )
      .send({
        from: blockchain.account,
      });
    console.log(receipt);
    history.push("/customer");

    // Call API to create customer
  }

  return (
    <Layout>
      <section className="pt-5">
        {formToggle ? (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="fw-bold text-white ">Create a bank</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create customer" : "Create bank"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={bankNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="customer Name - Eg. Ram Kumar"
                  />
                </div>
              </form>

              <div
                onClick={() => createbank()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >
                Create bank and Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold text-white">Create a customer</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create customer" : "Create bank"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group  my-4">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={customerNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="customer Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={customerAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={customerPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div>
                  <input type='file' name="aadhar" onChange={retrieveAadhar} />
                </div>

                <div>
                  <input type='file' name="pancard" onChange={retrievePan} />
                </div>


              </form>

              <div
                onClick={() => createcustomer()}
                className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
              >

                <div>

                  Your uploaded aadhar image
                  <img src={aadharUrl} alt="" />

                </div>

                <div>

                  Your uploaded pancard image
                  <img src={panUrl}  alt="" />

                </div>
                Create customer and Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
