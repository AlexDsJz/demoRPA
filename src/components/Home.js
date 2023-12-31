import React, { useEffect, useState } from "react";
import { useGetCall } from "seed/api";
import { detect } from "detect-browser";
import View from "components/Home.view";

const Home = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [callAuth, reqCall] = useGetCall("/auth/user", "", {
    onCompleted: (data) => setIsAuth(true),
    onError: () => window.location.replace("/login")
    // IMPORTANT: Switch to normal login (e.g /login) when copying
  })
  useEffect(() => {
    if (localStorage.getItem("id") != null) { //Preload data from localStorage
      sessionStorage.setItem("token", localStorage.getItem("token"));
      sessionStorage.setItem("id", localStorage.getItem("id"));
      sessionStorage.setItem("rol", localStorage.getItem("rol"));
    }
    const browser = detect();
    callAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!isAuth) return null;
  return <View rol={sessionStorage.getItem("rol")} />;
}

Home.propTypes = {};

export default Home;