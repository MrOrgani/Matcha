import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import Button from "@material-ui/core/Button";
import * as yup from "yup";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  password: ""
};

const userSchema = yup.object().shape({
  fname: yup.string().required(),
  lname: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
});

function Form(props) {
  return (
    <React.Fragment>
      <Formik
        initialValues={initialState}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
        validationSchema={userSchema}
      >
        {props =>
          !props.isSubmitting ? (
            <form onSubmit={props.handleSubmit}>
              <Field
                type="email"
                placeholder="Enter email"
                onChange={props.handleChange}
                name="email"
                value={props.values.email}
              />
              <Field
                type="password"
                onChange={props.handleChange}
                name="password"
                value={props.values.password}
                placeholder="Password"
              />
              <Field
                name="fname"
                onChange={props.handleChange}
                value={props.values.fname}
                type="text"
                placeholder="First name"
              />

              <Field
                name="lname"
                onChange={props.handleChange}
                value={props.values.lname}
                type="text"
                placeholder="Last name"
              />
              <br />
              <Button
                type="submit"
                disabled={!props.dirty && !props.isSubmitting}
              >
                Submit
              </Button>
              <Button
                disabled={!props.dirty}
                onClick={props.handleReset}
                type="button"
              >
                Reset
              </Button>
            </form>
          ) : (
            <div />
          )
        }
      </Formik>
    </React.Fragment>
  );
}

export default Form;
