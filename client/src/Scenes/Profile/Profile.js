import React, { useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import FormProfile from "./Components/FormProfile";
import { ProfileFormProvider } from "./Components/ProfileFormContext";
import "./Profile.css";
import { AuthContext } from "../../AuthContext";
import { notify } from "react-notify-toast";

export default function Profile() {
  const [, authContext] = useContext(AuthContext);
  const userData = authContext.data;

  useEffect(() => {
    if (!userData.isComplete)
      notify.show("You must complete your profile", "error");
  }, [userData]);

  return (
    <ProfileFormProvider>
      <Grid component="main" className="root">
        <h1 className="title">My Profile</h1>
        <FormProfile className="blue" />
      </Grid>
    </ProfileFormProvider>
  );
}
