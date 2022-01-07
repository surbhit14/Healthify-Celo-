import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";

import Hospital from "./assets/img/hero1.svg";

function Home() {
  let history = useHistory();
  const { address, web3, contract } = useContext(UserContext);
  const rd = async () => {
    // const t= await contract.methods.check(address).call()
    // console.log(t)

    const t = await contract.methods.Identify().call();
    console.log(t);
    if (t == 0) history.push("/register");
    else if (t == 1) history.push("/patient");
    else if (t == 2) history.push("/doctor");
  };
  return (
    <Layout>
      <div className="text-dark" style={{ paddingTop: "40px" }}>
        <div className="">
          <div className="d-flex bg-dark px-5 pb-3 justify-content-between mt-5 pt-5">
            <iframe
              title="hero"
              src="/hero.html"
              style={{
                width: "100vw",
                height: "45vh",
                zIndex: "5",
              }}
              frameborder="0"
              scrolling="no"
            ></iframe>
            <img
              style={{
                zIndex: "0",
                height: "40em",
                width: "70em",
                marginBottom: "-30rem",
              }}
              src={Hospital}
              alt=""
              srcset=""
            />
          </div>
        </div>
        <h2 className="py-5 my-5 px-2 w-50 mx-5 text-secondary mt-5 text-left">
          Healthify is the next generation of healthcare. The platform runs on
          smart contracts at the blockchain level.
        </h2>
      </div>
    </Layout>
  );
}

export default Home;
