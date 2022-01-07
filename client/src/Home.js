import Layout from "./components/Layout";

import Hospital from "./assets/img/hero1.svg";

function Home() {
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
