import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Upload, Icon, Modal } from "antd";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export const FirstName = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="First Name"
      name="firstName"
      variant="outlined"
      // required
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const LastName = props => {
  return (
    <TextField
      className="input"
      type="text"
      name="lastName"
      label="Last Name"
      variant="outlined"
      // required
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Email = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <TextField
      className="input"
      type="email"
      label="Email"
      name="email"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Login = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="Login"
      name="login"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Bio = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="Bio"
      name="bio"
      multiline
      rows="4"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Gender = props => {
  return (
    <TextField
      select
      label="Select Gender"
      // required
      value={props.value}
      onChange={props.onChange}
      // onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      margin="normal"
      variant="outlined"
    >
      <MenuItem value="" />
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
    </TextField>
  );
};

export const SexualOrientation = props => {
  return (
    <TextField
      select
      label="Sexual Orientation"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
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
  );
};

export const Age = props => {
  return (
    <TextField
      id="filled-number"
      label="Age"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      type="number"
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      variant="outlined"
    />
  );
};

export const UploadFile = props => {
  // https://stackoverflow.com/questions/56149756/reactjs-how-to-handle-image-file-upload-with-formik */

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <React.Fragment>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={props.fileList}
        onPreview={props.onPreview}
        onChange={event => {
          // console.log("EVENT ", event.fileList);
          props.setFieldValue("fileList", event.fileList);
        }}
      >
        {props.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        // visible={values.previewVisible}
        footer={null}
        onCancel={props.handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={props.values.previewImage}
        />
      </Modal>
    </React.Fragment>
  );
};

export const Submit = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      style={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white"
      }}
    >
      <SaveIcon />
      Save
    </Button>
  );
};
