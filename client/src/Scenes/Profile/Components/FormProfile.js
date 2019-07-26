import React from // , { useContext }
"react"; // , { useState }
// import { Formik } from "formik";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import Select from "@material-ui/core/Select";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

import useProfileForm from "./useProfileForm";
// import { ProfileFormContext } from "./ProfileFormContext";

import {
  FirstName,
  LastName,
  Email,
  Login,
  Bio,
  Gender,
  SexualOrient,
  Age,
  Submit
} from "./Components/FieldsForm";

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: "auto"
//   },
//   image: {
//     backgroundImage: "url(https://source.unsplash.com/random)",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center"
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   },
//   gallery: {
//     display: "inline",
//     width: "50%"
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1)
//   }
// }));

function FormProfile() {
  const { handleSubmit } = useProfileForm();
  // const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <FirstName />
      <LastName />
      <Gender />
      <Login />
      <Email />
      <Bio />
      <SexualOrient />
      <Age />
      <Submit />
    </form>
  );
}

export default FormProfile;
