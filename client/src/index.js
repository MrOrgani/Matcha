import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { CookiesProvider } from "react-cookie";
import "antd/dist/antd.css";

// console.log(theme);

ReactDOM.render(
  <CookiesProvider>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
