import React from "react";
import useProfileForm from "./useProfileForm";
import { Formik } from "formik";
// import { valuesValidations } from "./../../Home/Components/UserValidation";
import "./FormProfile.css";

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
        console.log("ta maman", values);
        // validate={valuesValidations}
        // UPLOAD DES IMAGES
        const files = Array.from(values.fileList);
        const formData = new FormData();

        files.forEach((file, i) => {
          console.log("file", file);
          formData.append(i, file);
        });
        // formData.append("author", "Morg");
        // formData.append("jwt", "123456789");
        await fetch(`http://localhost:9000/api/user/image-upload`, {
          method: "POST",
          body: formData
        }).then(res => res.json());
        //   .then(images => {
        //     this.setState({
        //       uploading: false,
        //       images
        //     });
        //   });
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
