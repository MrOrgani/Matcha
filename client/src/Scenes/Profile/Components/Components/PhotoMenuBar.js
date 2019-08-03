import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useFormControl } from "@material-ui/core/FormControl";
import useProfileForm from "./../useProfileForm";

const useStyles = makeStyles(theme => ({
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline"
  },
  add: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    marginLeft: "auto"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  input: {
    display: "none"
  }
}));

const PhotoMenuBar = props => {
  const classes = useStyles();
  const theme = useTheme();
  // const data = JSON.parse(sessionStorage.getItem("data"));
  const { handlePicture } = useProfileForm();

  return (
    <div className={classes.menu}>
      <MobileStepper
        steps={props.maxSteps}
        position="static"
        variant="text"
        activeStep={props.activeStep}
        className={classes.deb}
        nextButton={
          <Button
            size="small"
            onClick={props.backNext[1]}
            disabled={props.activeStep === props.maxSteps - 1}
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
          <Button
            size="small"
            onClick={props.backNext[0]}
            disabled={props.activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />

      <label htmlFor="single">
        <Avatar className={classes.add}>
          <AddIcon />
        </Avatar>
        <input
          accept="image/*"
          className={classes.input}
          id="single"
          type="file"
          name="add"
          onChange={handlePicture}
        />
      </label>

      <Avatar className={classes.avatar}>
        <DeleteIcon />
      </Avatar>
    </div>
  );
};

export default PhotoMenuBar;
