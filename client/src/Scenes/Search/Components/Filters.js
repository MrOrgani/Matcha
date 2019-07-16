import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import { FiltersContext } from "./FiltersContext";
import Slider from "@material-ui/core/Slider";

// import RangeSlider from './Components/Slider2'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0),
    display: "inline"
  },
  slider: {
    width: 20 + "em"
  }
}));

export default function Filters(props) {
  const classes = useStyles();
  // console.log("filters", props);
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender"
          className={classes.group}
          value={props.value[0]}
          onChange={props.onChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Age</FormLabel>
        <div className={classes.slider}>
          <Slider
            value={props.value[1]}
            onChange={props.onChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            name="age"
            // min="18"
            // max="100"
            // AriaValueText={valuetext}
          />
        </div>
      </FormControl>

      {/* <RangeSlider/> */}
    </div>
  );
}
