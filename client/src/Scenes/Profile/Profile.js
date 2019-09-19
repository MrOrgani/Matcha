import React, { useEffect, useContext } from "react";
// import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import FormProfile from "./Components/FormProfile";
import { ProfileFormProvider } from "./Components/ProfileFormContext";
import "./Profile.css";
import { AuthContext } from "../../AuthContext";
// import { withTheme } from "@material-ui/styles";
import { notify } from "react-notify-toast";

export default function Profile() {
  const [, authContext] = useContext(AuthContext);
  useEffect(() => {
    const userData = authContext.data;
    if (!userData.isComplete)
      notify.show("You must complete your profile", "error");
  }, []);

  return (
    <ProfileFormProvider>
      {/* <Notifications /> */}
      <Grid component="main" className="root">
        <h1 className="title">My Profile</h1>
        <FormProfile className="blue" />
      </Grid>
    </ProfileFormProvider>
  );
}
