import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";
import CreatePatient from "./components/CreatePatient";
import CreateDoctor from "./components/CreateDoctor";

let ContractKit = require("@celo/contractkit");

function Register() {
  const [formToggle, setFormToggle] = useState(false);

  const patientNameInputRef = useRef();
  const patientAddressInputRef = useRef();
  const patientPhoneInputRef = useRef();
  const patientAgeInputRef = useRef();
  const patientBloodGroupInputRef = useRef();

  const doctorNameInputRef = useRef();
  const doctorAddressInputRef = useRef();
  const doctorPhoneInputRef = useRef();
  const doctorPracticeInputRef = useRef();
  const doctorExpertiseInputRef = useRef();

  function createDoctor() {
    var doctorName = doctorNameInputRef.current.value;
    var doctorAddress = doctorAddressInputRef.current.value;
    var doctorPhone = doctorPhoneInputRef.current.value;
    var doctorPractice = doctorPracticeInputRef.current.value;
    var doctorExpertise = doctorExpertiseInputRef.current.value;

    console.log(
      doctorName,
      doctorAddress,
      doctorPhone,
      doctorPractice,
      doctorExpertise
    );

    // Call API to create doctor
  }
  function createPatient() {
    var patientName = patientNameInputRef.current.value;
    var patientAddress = patientAddressInputRef.current.value;
    var patientPhone = patientPhoneInputRef.current.value;
    var patientAge = patientAgeInputRef.current.value;
    var patientBloodGroup = patientBloodGroupInputRef.current.value;

    console.log(
      patientName,
      patientAddress,
      patientPhone,
      patientAge,
      patientBloodGroup
    );

    // Call API to create patient
  }

  const { address, web3, contract } = useContext(UserContext);
  let history = useHistory();
  const register = async function () {
    const receipt = await contract.methods
      .addPatientInfo(25, "fifrefel", "adefefr5", 20, "A+")
      .send({
        from: address,
      });
    console.log(receipt);
  };

  const reg = function () {
    history.push("/patient");
  };

  return (
    <Layout>
      <section>
        <div className="text-center">
          <div>{address}</div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={register}
          >
            Register
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={reg}
          >
            Profile
          </button>
        </div>

        {formToggle ? (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="font-weight-bold text-white">Create a Doctor</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create Patient" : "Create Doctor"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={doctorNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="Patient Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={doctorAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={doctorPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputPractice" className="text-secondary">
                    Practice Type
                  </label>
                  <input
                    ref={doctorPracticeInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPractice"
                    placeholder="Practice Type - Eg. Hospital"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputExpertise" className="text-secondary">
                    Area of Expertise
                  </label>
                  <input
                    ref={doctorExpertiseInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputExpertise"
                    placeholder="Area of Expertise - Eg. Cardiology"
                  />
                </div>
              </form>

              <div
                onClick={() => createDoctor()}
                className="mt-3 btn btn-block btn-lg text-dark font-weight-bold btn-primary p-3"
              >
                Create Doctor and Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="font-weight-bold text-white">Create a Patient</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle ? "Create Patient" : "Create Doctor"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group">
                  <label htmlFor="inputName" className="text-secondary">
                    Name
                  </label>
                  <input
                    ref={patientNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputName"
                    placeholder="Patient Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputAddress" className="text-secondary">
                    Address
                  </label>
                  <input
                    ref={patientAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputPhone" className="text-secondary">
                    Phone
                  </label>
                  <input
                    ref={patientPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputBlood" className="text-secondary">
                    Blood Group
                  </label>
                  <select
                    ref={patientBloodGroupInputRef}
                    id="inputBlood"
                    style={{ width: "100%" }}
                    className={
                      "p-3 d-flex bg-dark text-white rounded focus-none"
                    }
                    aria-label="Default select example"
                  >
                    <option selected>Choose a Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inputAge" className="text-secondary">
                    Age
                  </label>
                  <input
                    ref={patientAgeInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAge"
                    placeholder="Age - Eg. 25"
                  />
                </div>
              </form>

              <div
                onClick={() => createPatient()}
                className="mt-3 btn btn-block btn-lg text-dark font-weight-bold btn-primary p-3"
              >
                Create Patient and Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
