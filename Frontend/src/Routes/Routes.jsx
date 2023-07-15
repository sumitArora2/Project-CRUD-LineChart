import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "../Layout/Home/Home";
import NavBar from "../Layout/NavBar/NavBar";
import Add from "../Layout/Add/Add";
import AddHealthData from "../Layout/Add/AddHealthData";
import Edit from "../Layout/Edit/Edit";

const Routes = () => {
  return (
    <Fragment>
        <NavBar />
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/add" component={ Add } exact />
          <Route path="/addHealthData" component={ AddHealthData } exact />
          <Route path="/edit" component={ Edit } exact />
        </Switch>
      </Fragment>
  );
};

export default Routes;
