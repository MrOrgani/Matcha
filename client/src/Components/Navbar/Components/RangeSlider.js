import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const useStyles = makeStyles({
  root: {
    width: 18 + "vh",
    marginLeft: "auto",
    marginRight: "auto"
  }
  // slide: {
  // }
});

export default function RangeSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={props.value}
        onChange={props.onChange}
        valueLabelDisplay="auto"
        min={props.min}
        max={props.max}
      />
    </div>
  );
}
