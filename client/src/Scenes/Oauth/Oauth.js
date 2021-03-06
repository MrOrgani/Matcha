import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import Axios from "axios";

const Oauth = () => {
  const [, authContext] = useContext(AuthContext);
  const { setData, setIsAuth } = authContext; //DESTRUCTURING TO AVOID RERENDERS IN USEEFFECT

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const req = {};
      req.jwt = await urlParams.get("jwt");
      req.uuidSource = await urlParams.get("uuid");
      Axios.get(
        `http://localhost:9000/api/user/findOne?jwt=${req.jwt}&uuidSource=${req.uuidSource}`
      ).then(res => {
        if (res.status === 200) {
          setData(res.data);
          setIsAuth(1);
        }
      });
    })();
  }, [setData, setIsAuth]);

  return (
    <div>
      <p>Congratulations you are now logged in</p>
      <p>
        To access this account please log in with the same third party you used
      </p>
    </div>
  );
};

export default Oauth;
