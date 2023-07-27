import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePost } from "seed/api";
import { useGetCall } from "seed/api";
import View from "components/auth/Login.view";

const Login = ({ history }) => {

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState()

  const [callAuth, reqCall] = useGetCall("/auth/user", "", {
    onCompleted: data => window.location.replace("/")
  })

  const showRolError = () => {
    sessionStorage.clear();
    localStorage.clear();
    setError("No cuentas con permisos para ingresar al portal, consulta al administrador")
  };

  const [callRol, reqRol] = usePost("/users/rol", {
    onCompleted: (data) => {
      if (data == "ADMIN" || data == "SECURITY" || data == "COMMERCIAL" || data == "MAINTENANCE_SUPERVISOR") {
        sessionStorage.setItem("rol", data);
        if (localStorage.getItem("rememberMe")) {
          localStorage.setItem("rol", data);
        }
        window.location.href = "/";
      }
      else showRolError();
    },
    onError: () => showRolError()
  });

  const [callLogin, reqLogin] = usePost("/auth/login", {
    onCompleted: (data) => {
      const { key, user } = data;
      sessionStorage.setItem("token", key);
      sessionStorage.setItem("id", user);
      if (rememberMe) {
        localStorage.setItem("token", key);
        localStorage.setItem("id", user);
        localStorage.setItem("rememberMe", true);
      }
      callRol({ user_id: user });
    },
    includeAuth: false
  });

  useEffect(() => {
    if (localStorage.getItem("id") != null) { //Preload data from localStorage
      sessionStorage.setItem("token", localStorage.getItem("token"));
      sessionStorage.setItem("id", localStorage.getItem("id"));
      sessionStorage.setItem("rol", localStorage.getItem("rol"));
    }
    callAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values) => {
    const { email, password, rememberMe } = values;
    setRememberMe(rememberMe)
    callLogin({ email: email, password: password });
  };

  if (reqLogin.error && error == null)
    setError("Usuario o contraseña inválidos");

  return <View
    error={error}
    onSubmit={onSubmit}
  />;

}

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default Login;