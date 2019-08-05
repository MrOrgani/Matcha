import React from "react";
import useProfileForm from "./useProfileForm";
import { Formik } from "formik";
// import { valuesValidations } from "./../../Home/Components/UserValidation";
import "./FormProfile.css";
import axios from "axios";

import {
  FirstName,
  LastName,
  Email,
  Login,
  Bio,
  Gender,
  SexualOrientation,
  Age,
  UploadFile,
  Submit
} from "./Components/FieldsForm";

function FormProfile() {
  const { values, handlePreview, handleCancel } = useProfileForm();

  return (
    <Formik
      initialValues={values}
      onSubmit={async values => {
        // validate={valuesValidations}
        console.log("the values are", values);
        const userValues = JSON.parse(sessionStorage.getItem("data"));
        // *******  UPLOAD PICTURES
        const files = Array.from(values.fileList);
        const formData = new FormData();
        files.forEach((file, i) => {
          formData.append(i, file.originFileObj);
        });
        // ---- send data to back for images
        const api = `http://localhost:9000/api/user/profile?login=${
          userValues.login
        }&jwt=${userValues.jwt}`;
        await fetch(api, {
          method: "POST",
          body: formData
        });
        // .then(res => console.log("result of fetch post image =", res));
        // values.fileList = returnOfPics.data.fileList;
        // ---- send data to back for info
        console.log("ta maman", values);
        delete values.previewVisible;
        values.fileList = [];

        delete values.previewImage;
        delete values.pics;
        let newData = await axios
          .patch(api, { values })
          .catch(err => console.log(err));
        // // sessionStorage.setItem("data", JSON.stringify(newData.data));
        console.log("newData", newData);
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
            <div className="name">
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
            <div className="search">
              <h2>I am a ...</h2>
              <Gender
                value={values.gender}
                onChange={handleChange("gender")}
                onBlur={handleBlur}
                helperText={[errors.gender, touched.gender, errors.gender]}
              />
              <h2>I want to date</h2>
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
            <div className="localisation">
              <h2>Where I live...</h2>
            </div>
            <div className="login">
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
            <div className="mail">
              <Email
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur}
                helperText={[errors.email, touched.email, errors.email]}
              />
              {/* <Email
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur}
                helperText={[errors.email, touched.email, errors.email]}
              /> */}
            </div>
            <div className="bio">
              Tell us something about you :
              <Bio
                value={values.bio}
                onChange={handleChange("bio")}
                onBlur={handleBlur}
                helperText={[errors.bio, touched.bio, errors.bio]}
              />
            </div>
            <div className="photos">
              Your photos
              <UploadFile
                fileList={values.fileList}
                onBlur={handleBlur}
                onPreview={handlePreview}
                values={values}
                setFieldValue={setFieldValue}
                handleCancel={handleCancel}
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
