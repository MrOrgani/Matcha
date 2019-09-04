import React, { useState } from "react";

const ConnectButtonContext = React.createContext([{}, () => {}]);

const ConnectButtonProvider = props => {
  //   const data = JSON.parse(sessionStorage.getItem("data"));
  const [state, setState] = useState({
    isSubmitionCompleted: false,
    submitting: false,
    isValid: true,
    textError: "",
    email: "",
    login: "",
    password: ""
  });

  return (
    <ConnectButtonContext.Provider value={[state, setState]}>
      {props.children}
    </ConnectButtonContext.Provider>
  );
};

export { ConnectButtonContext, ConnectButtonProvider };
