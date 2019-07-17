import React, { useState } from "react";
import Photos from "./Components/Photos";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
  root: {
    height: "auto"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  gallery: {
    display: "inline",
    width: "50%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function Profile() {
  const classes = useStyles();
  const [values, setValues] = useState({
    sexualOrientation: "",
    name: "hai",
    email: "hello@gmail.com"
  });
  const inputLabel = React.useRef(null);

  // const [labelWidth, setLabelWidth] = useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };
  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <Grid item xs={6}> */}
      <div className={classes.gallery}>
        <Photos />
      </div>
      <Grid
        item
        xs={6}
        //   sm={8} md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              variant="outlined"
              name="name"
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows="4"
              fullWidth
              id="bio"
              label="Biography"
              name="bio"
              autoComplete="email"
              autoFocus
            />

            <Typography component="h1">Sexual Orientation</Typography>
            <Select
              native
              className={classes.textField}
              value={values.sexualOrientation}
              onChange={handleChange("sexualOrientation")}
              input={
                <OutlinedInput
                  name="sexualOrientation"
                  // labelWidth={labelWidth}
                  id="outlined-age-native-simple"
                />
              }
            >
              {/* <option value="" /> */}
              <option value={10}>Bi</option>
              <option value={20}>Straight</option>
              <option value={30}>Gay</option>
            </Select>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change my information
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>{/* <MadeWithLove /> </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
