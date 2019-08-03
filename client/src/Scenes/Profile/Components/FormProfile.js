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
        //       ---- add complementatry data (login, & jwt)
        // formData.append(
        // "userSource",
        // JSON.parse(sessionStorage.getItem("data")).login
        // );
        // formData.append("jwt", JSON.parse(sessionStorage.getItem("data")).jwt);
        // ---- send data to back for images
        const api = `http://localhost:9000/api/user/profile?login=${
          userValues.login
        }&jwt=${userValues.jwt}`;
        await fetch(api, {
          method: "POST",
          body: formData
        });
        // .then(res => console.log("result of fetch post image =", res));

        // values.fileList = [];
        // //       ---- send data to back for info
        // console.log("ta maman", values);
        // delete values.previewVisible;
        // delete values.previewImage;
        // values.jwt = JSON.parse(sessionStorage.getItem("data")).jwt;
        // values.userSource = JSON.parse(sessionStorage.getItem("data")).login;
        // let newData = await axios
        //   .patch("http://localhost:9000/api/user/profile", { values })
        //   .catch(err => console.log(err));
        // // sessionStorage.setItem("data", JSON.stringify(newData.data));
        // // console.log("newData", newData.data);
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
        <form onSubmit={handleSubmit} className="container">
          <FirstName
            value={values.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur}
            helperText={[errors.firstName, touched.firstName, errors.firstName]}
          />
          <LastName
            value={values.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur}
            helperText={[errors.lastName, touched.lastName, errors.lastName]}
          />
          <Gender
            value={values.gender}
            onChange={handleChange("gender")}
            onBlur={handleBlur}
            helperText={[errors.gender, touched.gender, errors.gender]}
          />

          <Login
            value={values.login}
            onChange={handleChange("login")}
            onBlur={handleBlur}
            helperText={[errors.login, touched.login, errors.login]}
          />
          <Email
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur}
            helperText={[errors.email, touched.email, errors.email]}
          />
          <Bio
            value={values.bio}
            onChange={handleChange("bio")}
            onBlur={handleBlur}
            helperText={[errors.bio, touched.bio, errors.bio]}
          />
          <SexualOrientation
            value={values.sexualOrientation}
            onChange={handleChange("sexualOrientation")}
            onBlur={handleBlur}
            helperText={[
              errors.sexualOrientation,
              touched.sexualOrientation,
              errors.sexualOrientation
            ]}
          />
          <Age
            value={values.age}
            onChange={handleChange("age")}
            onBlur={handleBlur}
            helperText={[errors.age, touched.age, errors.age]}
          />
          <UploadFile
            fileList={values.fileList}
            onBlur={handleBlur}
            onPreview={handlePreview}
            values={values}
            setFieldValue={setFieldValue}
            handleCancel={handleCancel}
          />

          <Submit />
        </form>
      )}
    </Formik>
  );
}

export default FormProfile;
