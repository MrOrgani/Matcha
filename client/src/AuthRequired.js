import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
//https://medium.com/@rossbulat/react-router-require-authentication-with-singular-component-f3266c5b3f79
//Check for token and redirect ifnot

const AuthRequired = props => {
  // check for token with request to back
  const isAuth = { verif: true };

  // useEffect(_ => {
  const fetchData = async () => {
    const data = JSON.parse(sessionStorage.getItem("data"));
    axios
      .post("http://localhost:9000/api/user/verify", {
        jwt: data.jwt,
        userSource: data.login
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          isAuth.verif = true;
        } else {
          isAuth.verif = false;
        }
      });
  };
  fetchData();
  // });

  console.log(isAuth.verif);
  if (isAuth.verif) {
    console.log("ici baby");
    return props.orRender;
  } else return <Redirect to="/" />;
  // return (
  //   {isAuth.verif ? props.orRender : <Redirect to="/"}
  // )
};

export default AuthRequired;
