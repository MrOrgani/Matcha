import React from "react";
import TextField from "@material-ui/core/TextField";

export const Email = props => {
  return (
    <TextField
      className="input"
      required
      type="email"
      label="Email"
      name="email"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};
