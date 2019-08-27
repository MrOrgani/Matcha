import React from "react";
import useProfileForm from "./useProfileForm";
// import { ProfileFormContext } from "./ProfileFormContext";
import { Formik } from "formik";
// import { valuesValidations } from "./../../Home/Components/UserValidation";
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

function FormProfile() {
  const { values } = useProfileForm();

  return (
    <Formik
      initialValues={values}
      onSubmit={async values => {
        // validate={valuesValidations}
        // console.log("the values are", values);
        const userValues = JSON.parse(sessionStorage.getItem("data"));
        // *******  UPLOAD PICTURES
        // const files = Array.from(values.fileList);
        // const formData = new FormData();
        // files.forEach((file, i) => {
        //   formData.append(i, file.originFileObj);
        // });
        // ---- send data to back for images
        const api = `http://localhost:9000/api/user/profile?login=${userValues.login}&jwt=${userValues.jwt}`;
        // await fetch(api, {
        //   method: "POST",
        //   body: formData
        // });
        // .then(res => console.log("result of fetch post image =", res));
        // values.fileList = returnOfPics.data.fileList;
        // ---- send data to back for info
        console.log("ta maman", values);
        // delete values.previewVisible;
        // values.fileList = [];

        // delete values.previewImage;
        // delete values.pics;

        let newData = await axios
          .patch(api, { values })
          .catch(err => console.log(err.response.data));
        console.log("newData", newData);
        sessionStorage.setItem("data", JSON.stringify(newData.data));
      }}
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
              <ProfileMap setFieldValue={setFieldValue} />
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
                  errors.password,
                  touched.password,
                  errors.password
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
            </div>
            <div className="box tags">
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
