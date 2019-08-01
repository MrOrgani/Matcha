import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => {
  // const data = sessionStorage.data;
  const isAuth = sessionStorage.isAuth;

  // console.log("SecureRoute, is auth ==", isAuth, "data = ", data);

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth > 0) {
          return <Component {...props} />;
        } else {
          console.log("redirected bitch");
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
