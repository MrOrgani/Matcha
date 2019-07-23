import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import MobileStepper from "@material-ui/core/MobileStepper";
// import Button from "@material-ui/core/Button";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import AddIcon from "@material-ui/icons/Add";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Avatar from "@material-ui/core/Avatar";
import PhotoMenuBar from "./Components/PhotoMenuBar";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
// import { API_URL } from "./CompTestPhotos/config";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  }
}));

export default function Photos(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const data = JSON.parse(sessionStorage.getItem("data"));
  const maxSteps = data.pics.length;
  const [images, setImages] = useState([]);

  const onChange = async e => {
    const files = Array.from(e.target.files);
    // this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    await fetch(`http://localhost:9000/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        axios.post("http://localhost:9000/api/user/", {
          imageAdd: images,
          uuid: data.uuid
        });
        setImages(images);
      });
    console.log("images", images);
  };
  //   const [index, setIndex] = React.useState(0);
  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        src={data.pics[activeStep]}
        alt={data.pics[activeStep]}
      />
      <PhotoMenuBar onChange={onChange} />
    </div>
  );
}
