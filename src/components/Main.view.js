import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "components/auth/Login";
import Logout from "components/auth/Logout";
import Home from "components/Home";

const MainView = () =>
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/" component={Home}/>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>;

MainView.propTypes = {};

export default MainView;