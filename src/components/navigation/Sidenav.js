import React, { useState } from "react";
import { useHistory } from "react-router";
import View from "components/navigation/Sidenav.view";

const Sidenav = () => {
  const rol = sessionStorage.getItem("rol")
  const history = useHistory();

  const path = history.location.pathname;

  return <View rol={rol} path={path} />;
}

Sidenav.propTypes = {};

export default Sidenav;