import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { CookiesProvider } from "react-cookie";
import "antd/dist/antd.css";
import Routes from "./Scenes";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <CookiesProvider>
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MuiThemeProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
