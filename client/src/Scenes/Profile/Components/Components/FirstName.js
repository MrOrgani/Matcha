import React from "react";
import TextField from "@material-ui/core/TextField";

export const FirstName = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="First Name"
      name="firstName"
      variant="outlined"
      // required
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};
