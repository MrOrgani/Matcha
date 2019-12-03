import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

export default ({ component: Component, conditions: Conditions, ...rest }) => {
  const [secureAuth, setSecureAuth] = useState(true);
  const [, authContext] = useContext(AuthContext);

  const fetchData = async data => {
    const result = await axios.get(
      `http://localhost:9000/api/user/findOne?jwt=${data.jwt}&uuidSource=${data.uuid}&category=uuid`
    );
    if (!result) setSecureAuth(false);
    await Conditions.forEach(condition => {
      if (result.data[condition] !== true) {
        setSecureAuth(false);
      }
    });
  };
  if (Conditions && authContext.data) fetchData(authContext.data);

  return (
    <Route
      {...rest}
      render={props => {
        if (authContext.isAuth && secureAuth) return <Component {...props} />;
        else if (authContext.isAuth) {
          window.location = "/Profile";
          return <Redirect to="/Profile" />;
        } else return <Redirect to="/" />;
      }}
    />
  );
};
