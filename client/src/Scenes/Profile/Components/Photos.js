import React from "react";
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
  // const [images, setImages] = useState([]);
  const maxSteps = data.pics.length;

  console.log(props);

  async function onChange(e) {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("0", file);
    console.log("formData", formData);

    await fetch(`http://localhost:9000/api/user/profile`, {
      method: "POST",
      body: formData
    }).then(
      async res => {
        const urlAddedPic = await res.json();
        const data2Profile = {
          login: data.login,
          jwt: data.uuid,
          addPic: urlAddedPic
        };
        await axios
          .patch(`http://localhost:9000/api/user/profile`, data2Profile)
          .catch(err =>
            console.log(`Error when transfering url of picture : ${err}`)
          );
      }
      // res.json()
    );
    // .then(images => setImages(images));
  }
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
        src={props.pics[activeStep]}
        alt={props.pics[activeStep]}
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
