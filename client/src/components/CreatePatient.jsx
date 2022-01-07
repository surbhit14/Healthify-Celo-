import Layout from "../layouts/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import Hospital from "../assets/img/hospital.png";

import { useState } from "react";

export default function CreatePatient() {
  const [name, setName] = useState({});
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState({});
  const [age, setAge] = useState({});
  const [bloodGroup, setBloodGroup] = useState({});

  function createPatient() {
    console.log(name, address, phone, age, bloodGroup);

    // Call API to create patient
  }

  return (
    <ErrorBoundary>
      {" "}
      <div className="text-dark container" style={{ paddingTop: "150px" }}>
        <div className="mb-5 d-flex justify-content-between  align-items-center">
          <h1 className="font-weight-bold text-white">Create a Patient</h1>
        </div>
        <section className="pb-5 mb-5">
          <form>
            <div className="form-group">
              <label htmlFor="inputName" className="text-secondary">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
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
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
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
                onChange={(e) => setBloodGroup(e.target.value)}
                id="inputBlood"
                style={{ width: "100%" }}
                className={"p-3 d-flex bg-dark text-white rounded focus-none"}
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
                onChange={(e) => setAge(e.target.value)}
                type="number"
                className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
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
    </ErrorBoundary>
  );
}
