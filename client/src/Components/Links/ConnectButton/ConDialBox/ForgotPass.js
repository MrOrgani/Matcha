import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { ForgotValidation } from "../../../../utils/FormValidation";
import { Result } from "antd";

export default function ForgotPass() {
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");

  const initialState = {
    email: ""
  };

  return (
    <React.Fragment>
      <DialogContent>
        {!isSubmitionCompleted ? (
          <Formik
            initialValues={initialState}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              axios
                .post("http://localhost:9000/api/user/forgot", values, {
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                .then(res => {
                  if (res.status === 200) setSubmitionCompleted(true);
                  else {
                    let errorStr = "";
                    setSubmitionCompleted(true);
                    setValid(false);
                    if (typeof res.data !== "string") {
                      for (let strKey in res.data) {
                        errorStr += res.data[strKey] + "\n";
                      }
                    } else {
                      errorStr = res.data;
                    }
                    setTextError(errorStr.trim());
                  }
                })
                .catch(err =>
                  console.log("Error while registering: ", err.response.data)
                );
            }}
            validate={ForgotValidation}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <form onSubmit={handleSubmit} className="registerBlock">
                  <TextField
                    error={errors.email && touched.email}
                    label="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                    margin="normal"
                  />
                  <DialogActions>
                    <Button type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        ) : (
          <Result
            status={isValid ? "success" : "error"}
            title={isValid ? "Email sent !" : "Error."}
            subTitle={
              isValid
                ? "An email to reset your password has been sent :)"
                : textError
            }
          />
        )}
      </DialogContent>
    </React.Fragment>
  );
}
