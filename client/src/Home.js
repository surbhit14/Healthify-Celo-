import Layout from "./components/Layout";

import Hospital from "./assets/img/hero1.svg";

function Home() {
  return (
    <Layout>
      <div className="text-dark">
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
                height: "30rem",
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

        <section className="vh-100  d-flex flex-column-reverse flex-md-row align-justify-center mt-4">
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-0">
            <div className="px-md-5">
              <h2 style={{ fontSize: "5em" }} className="text-white fw-bold">
                EHR on the Fly
              </h2>
              <p className="pt-3 h5 text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                aperiam error iste aspernatur illo, ipsum itaque voluptate ab
                fugiat explicabo beatae eveniet optio vero nemo nulla quae non
                voluptatem aut.
              </p>
            </div>
          </div>
          <div className="bg-dark rounded-circle mt-3 mt-md-0 d-flex align-items-center justify-content-center w-100">
            <img height="auto" width="65%" src={Hospital} alt="" />
          </div>
        </section>
        <section className="vh-100  d-flex flex-column-reverse flex-md-row align-justify-center mt-4">
          <div className="bg-dark rounded-circle mt-3 mt-md-0 d-flex align-items-center justify-content-center w-100">
            <img height="auto" width="65%" src={Hospital} alt="" />
          </div>
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-0">
            <div className="px-md-5">
              <h2 style={{ fontSize: "5em" }} className="text-white fw-bold">
                EHR on the Fly
              </h2>
              <p className="pt-3 h5 text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                aperiam error iste aspernatur illo, ipsum itaque voluptate ab
                fugiat explicabo beatae eveniet optio vero nemo nulla quae non
                voluptatem aut.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
