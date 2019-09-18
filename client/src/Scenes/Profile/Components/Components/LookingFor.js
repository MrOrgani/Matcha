import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export const LookingFor = props => {
  return (
    <TextField
      select
      label="Sexual Orientation"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      margin="normal"
      variant="outlined"
    >
      <MenuItem value="" />
      <MenuItem key="bi" value="both">
        Both
      </MenuItem>
      <MenuItem key="straight" value="male">
        Male
      </MenuItem>
      <MenuItem key="gay" value="female">
        Female
      </MenuItem>
    </TextField>
  );
};
