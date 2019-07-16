import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import { Images } from "./images";

const tutorialSteps = [
  {
    imgPath: "https://pmcdeadline2.files.wordpress.com/2016/02/nicolas-cage.jpg"
  },
  {
    imgPath:
      "https://timedotcom.files.wordpress.com/2015/07/nicolas-cage1.jpg?quality=85"
  },
  {
    imgPath:
      "http://images5.fanpop.com/image/photos/26900000/Nicolas-Cage-nicolas-cage-26969966-1941-1300.jpg"
  },
  {
    imgPath:
      "http://image.tmdb.org/t/p/original/gbmePhMPICKgHJcT4mLtFCKSFB1.jpg"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: "50%",
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    // height: "100%",
    maxWidth: "auto",
    // overflow: "hidden",
    display: "block",
    width: "100%"
  }
}));

export default function Photos() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  //   const [index, setIndex] = React.useState(0);
  return (
    <div className={classes.root}>
      {/* <Paper square elevation={0} className={classes.header}> */}
      {/* <Typography>{tutorialSteps[activeStep].label}</Typography> */}
      {/* </Paper> */}
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
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
