import Layout from "../layouts/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import Hospital from "../assets/img/hospital.png";

import { useState } from "react";

export default function CreateDoctor() {
  const [name, setName] = useState({});
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState({});
  const [practice, setPractice] = useState({});
  const [expertise, setExpertise] = useState({});

  function createDoctor() {
    console.log(name, address, phone, practice, expertise);

    // Call API to create doctor
  }

  return (
    <ErrorBoundary>
      <div className="text-dark container" style={{ paddingTop: "150px" }}>
        <div className="mb-5 d-flex justify-content-between  align-items-center">
          <h1 className="font-weight-bold text-white">Create a Doctor</h1>
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
              <label htmlFor="inputPractice" className="text-secondary">
                Practice Type
              </label>
              <input
                onChange={(e) => setPractice(e.target.value)}
                type="text"
                className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
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
                onChange={(e) => setExpertise(e.target.value)}
                type="text"
                className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
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
    </ErrorBoundary>
  );
}
