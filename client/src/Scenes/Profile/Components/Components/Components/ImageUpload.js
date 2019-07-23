import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  input: {
    display: "none"
  }
});

const ImageUpload = () => {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadFile, setUploadedFile] = useState({});

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    sendFile();
  };

  const sendFile = async () => {
    // preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:9000/api/user/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("server problem");
      } else {
        console.log(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      {/* <form> */}
      <input
        accept="image/*"
        className={classes.input}
        id="outlined-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="outlined-button-file">Upload a photo</label>
      {/* </form> */}
    </Fragment>
  );
};

export default ImageUpload;
