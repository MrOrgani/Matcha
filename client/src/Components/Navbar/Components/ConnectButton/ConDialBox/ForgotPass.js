import React, { useState, useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { ForgotValidation } from "./UserValidation";
import { ConnectButtonContext } from "./../ConnectButtonContext";

export default function ForgotPass() {
  const [
    state
    //  setState
  ] = useContext(ConnectButtonContext);
  console.log("state", state);
  //   const initialState = {
  //     email: ""
  //   };

  const [
    isSubmitionCompleted
    //  setSubmitionCompleted
  ] = useState(false);
  //   const [isValid, setValid] = useState(false);
  //   const [textError, setTextError] = useState("");
  return (
    <DialogContent>
      {!isSubmitionCompleted && (
        <Formik
          initialValues={state}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("values are", values);
            // const fetchEmail =
            axios.post("http://localhost:9000/api/user/forgot", values);

            //   axios
            //     .post("http://localhost:9000/api/user/register", values, {
            //       headers: {
            //         // "Access-Control-Allow-Origin": "*",
            //         "Content-Type": "application/json"
            //       }
            //     })
            //     .then(res => {
            //       console.log("response de l'API", res);
            //       if (res.status === 200) setSubmitionCompleted(true);
            //       else {
            //         console.log("erreure recue lors de l'enregistrement");
            //         let errorStr = "";
            //         setSubmitionCompleted(true);
            //         setValid(false);
            //         if (typeof res.data !== "string") {
            //           for (let strKey in res.data) {
            //             errorStr += res.data[strKey] + "\n";
            //           }
            //         } else {
            //           errorStr = res.data;
            //         }
            //         setTextError(errorStr.trim());
            //       }
            //     })
            //     .catch(err =>
            //       console.log("Error while registering: ", err.response.data)
            //     );
          }}
          validate={ForgotValidation}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              //   dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
              //   handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit} className="registerBlock">
                <TextField
                  error={errors.email && touched.email}
                  label="email"
                  name="email"
                  // className={classes.textField}
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
      )}
    </DialogContent>
  );
}
