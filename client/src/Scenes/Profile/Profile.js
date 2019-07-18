import React, { useState } from "react";
import Photos from "./Components/Photos";
import Avatar from "@material-ui/core/Avatar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormProfile from "./Components/FormProfile";

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
  // console.log(data);
  // const handleChange = name => event => {
  //   setValues({
  //     ...values,
  //     [name]: event.target.value
  //   });
  // };
  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <Grid item xs={6}> */}
      <div className={classes.gallery}>
        <Photos />
      </div>
      <Grid item xs={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <FormProfile />
        </div>
      </Grid>
    </Grid>
  );
}
