import React from "react";
import useProfileForm from "./useProfileForm";
import { Formik } from "formik";
import { valuesValidations } from "./../../Home/Components/UserValidation";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./FormProfile.css";

import {
  //   FirstName,
  //   LastName,
  //   Email,
  //   Login,
  //   Bio,
  //   Gender,
  //   SexualOrient,
  //   Age,
  Submit
} from "./Components/FieldsForm";

function FormProfile() {
  const { trigerSubmit, values } = useProfileForm();
  // console.log(trigerSubmit);
  console.log("FUUUUUUKING VALUES", values);
  // console.log(valuesValidations);
  return (
    <Formik
      initialValues={values}
      onSubmit={values => console.log("ta maman", values)}
      // validate={valuesValidations}
    >
      {({
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit} className="container">
          <TextField
            className="input"
            type="text"
            label="First Name"
            name="firstName"
            variant="outlined"
            value={values.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur}
            required
            helperText={
              errors.firstName && touched.firstName && errors.firstName
            }
          />
          <TextField
            className="input"
            type="text"
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={values.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur}
            required
            helperText={errors.lastName && touched.lastName && errors.lastName}
          />
          <TextField
            select
            label="Select Gender"
            value={values.gender}
            onChange={handleChange("gender")}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu,
            //   },
            // }}
            helperText={errors.gender && touched.gender && errors.gender}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="" />
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            className="input"
            type="text"
            label="Login"
            name="login"
            variant="outlined"
            value={values.login}
            onChange={handleChange("login")}
            onBlur={handleBlur}
            required
            helperText={errors.login && touched.login && errors.login}
          />
          <TextField
            className="input"
            type="text"
            label="Bio"
            name="bio"
            multiline
            rows="4"
            variant="outlined"
            value={values.bio}
            onChange={handleChange("bio")}
            onBlur={handleBlur}
            required
            helperText={errors.bio && touched.bio && errors.bio}
          />
          <TextField
            select
            label="Sexual Orientation"
            value={values.sexualOrientation}
            onChange={handleChange("sexualOrientation")}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu,
            //   },
            // }}
            helperText={
              errors.sexualOrientation &&
              touched.sexualOrientation &&
              errors.sexualOrientation
            }
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="" />
            <MenuItem key="bi" value="bi">
              Bi
            </MenuItem>
            <MenuItem key="straight" value="straight">
              Straight
            </MenuItem>
            <MenuItem key="gay" value="gay">
              Gay
            </MenuItem>
          </TextField>
          <TextField
            id="filled-number"
            label="Age"
            value={values.age}
            onChange={handleChange("age")}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
          {/* <FirstName props={[values, handleBlur, handleChange, errors, touched]} /> */}
          {/* <LastName props={[values, handleBlur, handleChange]} /> */}
          {/* <Gender props={[values, handleBlur, handleChange]} /> */}
          {/* <Login props={[values, handleBlur, handleChange]} /> */}
          {/* <Email props={[values, handleBlur, handleChange]} /> */}
          {/* <Bio props={[values, handleBlur, handleChange]} /> */}
          {/* <SexualOrient props={[values, handleBlur, handleChange]} /> */}
          {/* <Age props={[values, handleBlur, handleChange]} /> */}
          <Submit />
        </form>
      )}
    </Formik>
  );
}

export default FormProfile;
