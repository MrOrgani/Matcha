import React from "react";
// import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import FormProfile from "./Components/FormProfile";
import { ProfileFormProvider } from "./Components/ProfileFormContext";
import "./Profile.css";
import { withTheme } from "@material-ui/styles";

export default function Profile() {
  return (
    <ProfileFormProvider>
      <Grid component="main" className="root">
        {/* <Notifications /> */}
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            fontFamily: "Futura",
            fontSize: "30px",
            textAlign: "center",
            margin: "10px"
          }}
        >
          You must complete your profile
        </div>
        {/* <div className={classes.gallery}> */}
        {/* <Photos /> */}
        {/* <Upload /> */}
        {/* </div> */}
        {/* <Grid item xs={6} component={Paper} elevation={6} square> */}
        {/* <div className={classes.paper}> */}
        {/* <Avatar className={classes.avatar}> */}
        {/* <AccountCircleIcon /> */}
        {/* </Avatar> */}
        {/* <Typography component="h1" variant="h5" className="title"> */}
        <h1 className="title">My Profile</h1>
        {/* </Typography> */}
        {/* <div className={classes.blue}> */}
        <FormProfile className="blue" />
        {/* </div> */}
        {/* </div> */}
        {/* </Grid> */}
        {/* <TestPhotos /> */}
      </Grid>
    </ProfileFormProvider>
  );
}
