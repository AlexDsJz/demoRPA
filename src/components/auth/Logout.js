import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { usePost } from "seed/api";

const Logout = ({ history }) => {

  const [callLogout] = usePost("/auth/logout", {
    onCompleted: () => {
      sessionStorage.clear();
      localStorage.clear();
      history.replace("/");
    },
    onError: () => {
      sessionStorage.clear();
      localStorage.clear();
      history.replace("/");
    }
  });

  useEffect(() => callLogout(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div />;
  
}

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default Logout;