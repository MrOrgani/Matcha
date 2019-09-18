import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => {
  const isAuth = sessionStorage.isAuth;

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
