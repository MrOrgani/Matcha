import React, {
  useState
  // useEffect
} from "react";
import axios from "axios";
// import { Spin, Icon } from "antd";
import { Result } from "antd";
import { Button } from "@material-ui/core";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { ResetValidation } from "../../Components/Navbar/Components/Links/ConnectButton/ConDialBox/UserValidation";

export default function Reset(props) {
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");

  const initialValues = {
    password: "",
    confNewPass: ""
  };
  return (
    <React.Fragment>
      {!isSubmitionCompleted ? (
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            const { id } = props.match.params;
            const api = `http://localhost:9000/api/user/forgot/${id}`;
            const resConf = await axios
              .patch(api, values)
              .catch(err => console.log(err));
            if (resConf.status === 200) {
              setSubmitionCompleted(true);
            } else {
              let errorStr = "";
              setSubmitionCompleted(true);
              setValid(false);
              if (typeof resConf.data !== "string") {
                for (let strKey in resConf.data) {
                  errorStr += resConf.data[strKey] + "\n";
                }
              } else {
                errorStr = resConf.data;
              }
              setTextError(errorStr.trim());
            }
          }}
          validate={ResetValidation}
        >
          {({
            values,
            errors,
            handleBlur,
            touched,
            handleChange,
            handleSubmit
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "5em"
              }}
              className="backg"
            >
              <TextField
                className="input"
                type="text"
                label="New Password"
                name="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <TextField
                className="input"
                type="text"
                label="Confirm Password"
                name="confNewPass"
                variant="outlined"
                value={values.confNewPass}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.confNewPass &&
                  touched.confNewPass &&
                  errors.confNewPass
                }
              />
              <div className="submit">
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                    fontFamily: "Futura",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <SaveIcon />
                  Save
                </Button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <Result
          status={isValid ? "success" : "error"}
          title={isValid ? "Succes." : "Error."}
          subTitle={isValid ? "Your password has been changed" : textError}
          extra={
            <Button key="login">
              <a href="/">Home</a>
            </Button>
          }
        />
      )}
    </React.Fragment>
  );
}
