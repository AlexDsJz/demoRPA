import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "components/Main";
import Stores from "components/information/Stores"
import ArissVerify from "components/arris/verify/Verify"
import Support from "components/information/Support";

import css from "styles/css/App.module.css";
import "styles/css/General.css";

const App = () =>
  <div class={css.module}>
    <BrowserRouter>
      <Switch>
        <Route path="/support" component={Support}/>
        <Route path="/stores" component={Stores}/>
        <Route path="/ariss_verify" component={ArissVerify}/>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </div>;

App.propTypes = {};

export default App;