import { createMuiTheme } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme({
  // theme: dark,
  palette: {
    primary: pink,
    secondary: indigo // Indigo is probably a good match with pink
  },
  typography: {
    button: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      // height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
  }
});

export default theme;
