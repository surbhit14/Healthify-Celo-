import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";

import Home2 from "./Home2";
import Register from "./Register2";
import Customer from "./Customer"
import Bank from "./Bank"

// import "./assets/scss/style.scss";



function App() {


  return (
    <>
      <Router>
        <Switch>
            <Route path="/" exact component={Home2} />
            <Route path="/register" exact component={Register} />
            <Route path="/customer" exact component={Customer} />
            <Route path="/bank" exact component={Bank} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
