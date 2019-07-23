import React, { useState } from "react";
import {
  makeStyles
  // , useTheme
} from "@material-ui/core/styles";
// import MobileStepper from "@material-ui/core/MobileStepper";
// import Button from "@material-ui/core/Button";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import AddIcon from "@material-ui/icons/Add";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Avatar from "@material-ui/core/Avatar";
import PhotoMenuBar from "./Components/PhotoMenuBar";
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
  // const maxSteps = data.pics.length;
  const [images, setImages] = useState([]);
  const maxSteps = data.pics.length;

  const onChange = async e => {
    const files = Array.from(e.target.files);
    // this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    await axios
      .post(`http://localhost:9000/api/user/profile`, {
        body: formData
      })
      .then(res => res.json())
      .then(async images => {
        await axios
          .patch("http://localhost:9000/api/user/profile", {
            imageAdd: images,
            userSource: data.login,
            jwt: data.uuid
          })
          .then(res => {
            console.log("response de l'API", res.data[0]._fields[0].properties);
            sessionStorage.setItem(
              "data",
              JSON.stringify(res.data[0]._fields[0].properties)
            );
          });
        setImages(images);
      });
    // console.log("images", images);
  };
  //   const [index, setIndex] = React.useState(0);
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        src={data.pics[activeStep]}
        alt={data.pics[activeStep]}
      />
      <PhotoMenuBar
        onChange={onChange}
        backNext={[handleBack, handleNext]}
        activeStep={activeStep}
        maxSteps={maxSteps}
      />
    </div>
  );
}
