import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

//SecureRoute uses context for auth --> connexion via url cannot show context
//Therefore it always fails

export default ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const data = authContext.data;
  const isAuth = authContext.isAuth;
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
            authContext.setIsAuth(1);
            console.log("success !", isAuth);
          } else {
            authContext.setIsAuth(0);
            authContext.setData(null);
          }
        });
    };
    fetchData();
  });

  console.log("SecureRoute, is auth ==", isAuth, "data = ", data);
  return (
    <Route
      {...rest}
      render={
        props => {
          if (isAuth === 1) {
            console.log("isAuth, apres condition, SecureRoute", isAuth);
            return <Component {...props} />;
          } else {
            console.log("redirected bitch");
            return <Redirect to="/" />;
          }
        }
        // isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
