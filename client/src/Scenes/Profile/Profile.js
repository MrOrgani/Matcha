import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormProfile from "./Components/FormProfile";
import { ProfileFormProvider } from "./Components/ProfileFormContext";
import "./Profile.css";

const useStyles = makeStyles(theme => ({
  root: {
    height: "auto",
    width: "50%",
    backgroundColor: "yellow"
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
    width: "50%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function Profile() {
  const classes = useStyles();

  // const handlePics = (pics, url) => {
  //   setValues({
  //     ...values,
  //     [pics]: url
  //   });
  // };
  return (
    <ProfileFormProvider>
      <Grid container component="main" className="root">
        {/* <Notifications /> */}
        {/* <div className={classes.gallery}> */}
        {/* <Photos /> */}
        {/* <Upload /> */}
        {/* </div> */}
        {/* <Grid item xs={6} component={Paper} elevation={6} square> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <FormProfile />
        </div>
        {/* </Grid> */}
        {/* <TestPhotos /> */}
      </Grid>
    </ProfileFormProvider>
  );
}
