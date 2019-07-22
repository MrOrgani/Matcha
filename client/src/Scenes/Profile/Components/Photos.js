import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import OptionIcon from "./Components/OptionIcon";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },

  img: {
    maxWidth: "auto",
    width: "100%",
    marginTop: -50 + "px"
  }
}));

export default function Photos(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const data = JSON.parse(sessionStorage.getItem("data"));
  const maxSteps = data.pics.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  //   const [index, setIndex] = React.useState(0);
  return (
    <div className={classes.root}>
      <OptionIcon className={classes.icon} />

      <img
        className={classes.img}
        src={data.pics[activeStep]}
        alt={data.pics[activeStep]}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
