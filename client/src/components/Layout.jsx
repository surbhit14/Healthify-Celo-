import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import Logo from "../assets/img/healthify.png";

export default function Layout(props) {
  const location = useLocation();

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
          className="shadow d-flex justify-content-between bg-black align-items-center pl-md-5 pl-4"
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
              <Link
                onClick={() => setIsOpen(false)}
                to="/"
                className="p-3 btn btn-outline-primary font-weight-bold btn-lg "
              >
                Get Started Now
              </Link>
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
