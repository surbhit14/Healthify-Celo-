import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Home2 from "./Home2";
import Register from "./Register";
import Doctor from "./Doctor";
import Patient2 from "./Patient2";
// import "./assets/scss/style.scss";



function App() {

  return (
    <>
      <Router>
        <Switch>
            <Route path="/" exact component={Home2} />
            <Route path="/register" exact component={Register} />
            <Route path="/patient" exact component={Patient2} />
            <Route path="/doctor" exact component={Doctor} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
