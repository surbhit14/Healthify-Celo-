import Layout from "./components/Layout";

import Hospital from "./assets/img/hero1.svg";

import { Component } from "react";
import { motion } from "framer-motion";

function Home() {
  const textArray = [
    "Hospital Mangement System",
    "on the Blockchain",
    "via Smart Contracts",
  ];
  class Hero extends Component {
    constructor() {
      super();
      this.state = { textIdx: 0 };
    }

    componentDidMount() {
      this.timeout = setInterval(() => {
        let currentIdx = this.state.textIdx;
        this.setState({ textIdx: currentIdx + 1 });
      }, 1800);
    }

    componentDidUnmount() {
      clearInterval(this.timeout);
    }

    render() {
      let textThatChanges = textArray[this.state.textIdx % textArray.length];

      return (
        <div style={{ height: "18rem" }} className="py-5 col-6">
          <motion.h1
            animate={{
              x: [0, 10, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 3.6,
              ease: "easeInOut",
              loop: Infinity,
            }}
            style={{
              fontSize: "4rem",
              fontFamily: "Montserrat",
            }}
            className="text-white fw-bold"
          >
            {textThatChanges}
          </motion.h1>
        </div>
      );
    }
  }

  return (
    <Layout>
      <div className="text-dark">
        <div className="container">
          <div className="d-md-flex d-block bg-dark px-5 pb-3 justify-content-between mt-5 pt-5">
            <Hero></Hero>

            <img
              style={{
                zIndex: "0",
                height: "30rem",
                width: "70em",
                marginBottom: "-30rem",
              }}
              src={Hospital}
              alt=""
              srcSet=""
            />
          </div>
          <h2 className="py-5 my-5 px-2 w-50 mx-5 text-secondary mt-5 text-start">
            <span className="text-primary fw-bold">Healthify</span> is the next
            generation of healthcare. The platform runs on smart contracts at
            the blockchain level.
          </h2>
        </div>

        <section className="container vh-100  d-flex flex-column-reverse flex-md-row align-justify-center mt-4">
          <div className="bg-dark  mt-3 mt-md-0 d-flex align-items-center justify-content-center w-100">
            <img height="auto" width="100%" src="/blocks.gif" alt="" />
          </div>
          <div className="d-flex align-items-center justify-content-center  mt-4 mt-md-0">
            <div className="px-md-5">
              <h2 style={{ fontSize: "5em" }} className="text-white  fw-bold">
                Become the future of{" "}
                <span className="text-primary">healthcare</span>
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

        <section className="vh-100 container d-flex flex-column-reverse flex-md-row align-justify-center mt-4">
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-0">
            <div className="px-md-5">
              <h2 style={{ fontSize: "5em" }} className="text-white fw-bold">
                Your Health Records -{" "}
                <span className="text-primary">Decentralized</span>
              </h2>
              <p className="pt-3 h5 text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                aperiam error iste aspernatur illo, ipsum itaque voluptate ab
                fugiat explicabo beatae eveniet optio vero nemo nulla quae non
                voluptatem aut.
              </p>
            </div>
          </div>
          <div className="bg-dark   mt-3 mt-md-0 d-flex align-items-center justify-content-center w-100">
            <img height="auto" width="100%" src="/blocks1.gif" alt="" />
          </div>
        </section>

        <section className="bg-black">
          <div className="container py-5">
            <div className="d-flex align-items-center justify-content-center">
              <div className="px-md-5 text-center text-secondary">
                <p className="badge text-secondary">Built by</p>
                <h6 className="text-white"> Surbhit Agrawal & Fabian Ferno</h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
