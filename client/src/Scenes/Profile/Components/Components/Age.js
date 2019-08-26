import React from "react";
import TextField from "@material-ui/core/TextField";

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
