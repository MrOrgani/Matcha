import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export default ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const data = JSON.parse(sessionStorage.data);
  const isAuth = sessionStorage.isAuth;
  //   console.log(rest);
  //   console.log(componentProp);
  useEffect(() => {
    console.log("secure route, use effect TRIGGGEEEERRRRRRREEEEEEDDD");
    if (data === null) return;
    const fetchData = async () => {
      axios
        .post("http://localhost:9000/api/user/verify", {
          jwt: data.jwt,
          userSource: data.login
        })
        .then(res => {
          console.log("in useEffect Secureroute, Response from API = ", res);
          if (res.status === 200) {
            sessionStorage.isAuth = 1;
            console.log("success !", isAuth);
          } else {
            sessionStorage.isAuth = 0;
            sessionStorage.data = null;
          }
        });
    };
    fetchData();
  });

  console.log("SecureRoute, is auth ==", isAuth);
  console.log(typeof isAuth);
  return (
    <Route
      {...rest}
      render={
        (props, isAuth) => {
          if (isAuth === 1) {
            console.log("isAuth, apres condition, SecureRoute", isAuth);
            return <Component {...props} />;
          } else return <Redirect to="/" />;
        }
        // isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
