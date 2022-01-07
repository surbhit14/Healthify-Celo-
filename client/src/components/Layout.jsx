import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";

import { Link, useLocation, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import { UserContext } from "../UserContext";
import Logo from "../assets/img/healthify.png";

export default function Layout(props) {
  const location = useLocation();
  const { address, web3, contract } = useContext(UserContext);
  var history = useHistory();

  const rd = async () => {
    // const t= await contract.methods.check(address).call()
    // console.log(t)

    const t = await contract.methods.Identify().call();
    console.log(t);
    if (t == 0) history.push("/register");
    else if (t == 1) history.push("/patient");
    else if (t == 2) history.push("/doctor");
  };

  function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          fixed="top"
          style={{
            marginTop: "-30px",
            paddingTop: "60px",
            paddingBottom: "30px",
          }}
          className={`shadow d-flex justify-content-between  align-items-center pl-md-5 pl-4 ${
            location.pathname === "/register" ? "bg-dark" : "bg-black"
          } `}
          collapseOnSelect
          expand="lg"
          expanded={isOpen}
          variant="dark"
        >
          <div className="d-flex col-12 align-items-center justify-content-between">
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand font-weight-bold text-primary mr-md-5  mr-3"
            >
              <img height="50px" src={Logo} alt="" srcset="" />
              <span className="ml-3">healthify</span>
            </Link>
            {location.pathname === "/" && (
              <div
                onClick={rd}
                className="p-3 btn btn-outline-primary font-weight-bold btn-lg "
              >
                Get Started Now
              </div>
            )}
          </div>
        </Navbar>
      </motion.div>
    );
  }

  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2.5 }}
          style={{ paddingTop: "130px" }}
          className={
            props.contained ? "container overflow-hidden" : "overflow-hidden"
          }
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
