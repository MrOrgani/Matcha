import React from "react";
import useProfileForm from "./useProfileForm";
// import { ProfileFormContext } from "./ProfileFormContext";
import { Formik } from "formik";
import "./FormProfile.css";
import axios from "axios";

import { FirstName } from "./Components/FirstName";
import { LastName } from "./Components/LastName";
import { Age } from "./Components/Age";
import { Bio } from "./Components/Bio";
import { Email } from "./Components/Email";
import { Gender } from "./Components/Gender";
import { Login } from "./Components/Login";
import { Passwords } from "./Components/Passwords";
import { Photo } from "./Components/Photo";
import { ProfileMap } from "./Components/ProfileMap";
import { SexualOrientation } from "./Components/SexualOrientation";
import { Submit } from "./Components/Submit";
import { Tags } from "./Components/Tags";
import { ProfileValidation } from "./../../../../src/Components/Navbar/Components/Links/ConnectButton/ConDialBox/UserValidation";
import Notifications, { notify } from "react-notify-toast";

function FormProfile() {
  const { values } = useProfileForm();

  return (
    <Formik
      initialValues={values}
      onSubmit={async values => {
        const userValues = JSON.parse(sessionStorage.getItem("data"));
        console.log("userValues", userValues);
        const api = `http://localhost:9000/api/user/profile?userSource=${userValues.login}&jwt=${userValues.jwt}`;
        console.log("ta maman", values);
        let newData = await axios
          .patch(api, { values })
          .catch(err => console.log(err.response.data));

        console.log(
          "FormProfile retour patch",
          // newData,
          newData.status,
          newData
        );
        if (newData.status === 200) {
          // setSubmitionCompleted(true);
          // socketContext.socket && socketContext.socket.emit("logOut");
          // console.log(newData.data);
          // authContext.setData(newData.data);
          // authContext.setIsAuth(1);
          console.log("NEW DATA", newData.data);
          sessionStorage.setItem("data", JSON.stringify(newData.data));
          notify.show("Your profile has been updated !", "success");
        } else {
          // const errjson = await newData.json();
          for (let error in newData.data) {
            notify.show(newData.data[error], "error");
          }
          // setSubmitionCompleted(true);
          // setValid(false);
          // if (typeof newData.data !== "string") {
          //   for (let strKey in newData.data) {
          //     errorStr += newData.data[strKey] + "\n";
          //   }
          // } else {
          //   errorStr = newData.data;
          // }
          // setTextError(errorStr.trim());
        }
        // console.log("newData", newData);
      }}
      validate={ProfileValidation}
    >
      {({
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <Notifications />
          <div className="containerFormProfile">
            <div className="box name">
              <FirstName
                value={values.firstName}
                onChange={handleChange("firstName")}
                onBlur={handleBlur}
                helperText={[
                  errors.firstName,
                  touched.firstName,
                  errors.firstName
                ]}
              />
              <LastName
                value={values.lastName}
                onChange={handleChange("lastName")}
                onBlur={handleBlur}
                helperText={[
                  errors.lastName,
                  touched.lastName,
                  errors.lastName
                ]}
              />
            </div>
            <div className="box search">
              I am a ...
              <Gender
                value={values.gender}
                onChange={handleChange("gender")}
                onBlur={handleBlur}
                helperText={[errors.gender, touched.gender, errors.gender]}
              />
              I want to date
              <SexualOrientation
                value={values.sexualOrientation}
                onChange={handleChange("sexualOrientation")}
                helperText={[
                  errors.sexualOrientation,
                  touched.sexualOrientation,
                  errors.sexualOrientation
                ]}
              />
            </div>
            <div className="mapDiv">
              <ProfileMap
                setFieldValue={setFieldValue}
                onChange={handleChange("city")}
                value={values.city}
              />
            </div>
            <div className="box login">
              <Login
                value={values.login}
                onChange={handleChange("login")}
                onBlur={handleBlur}
                helperText={[errors.login, touched.login, errors.login]}
              />
              <Age
                value={values.age}
                onChange={handleChange("age")}
                onBlur={handleBlur}
                helperText={[errors.age, touched.age, errors.age]}
              />
            </div>
            <div className="box mail">
              <Email
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur}
                helperText={[errors.email, touched.email, errors.email]}
              />
              <Passwords
                value={[values.oldpassword, values.newpassword]}
                onChange={[
                  handleChange("oldpassword"),
                  handleChange("newpassword")
                ]}
                onBlur={handleBlur}
                helperText={[
                  errors.newpassword,
                  touched.newpassword,
                  errors.newpassword
                ]}
              />
            </div>
            <div className="box bio">
              Tell us something about you :
              <Bio
                value={values.bio}
                onChange={handleChange("bio")}
                onBlur={handleBlur}
                helperText={[errors.bio, touched.bio, errors.bio]}
              />
            </div>
            <div className="box photos">
              Your photos
              <Photo setFieldValue={setFieldValue} />
              {errors.pics
                ? notify.show("You must upload at least 1 picture", "error")
                : null}
            </div>
            <div className="box tags">
              {errors.hobbies
                ? notify.show("You must choose at least 5 tags", "error")
                : null}
              <Tags
                value={values.hobbies}
                // onClick={handleTags}
                // onChange={handleChange("hobbies")}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="submit">
              <Submit />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default FormProfile;
