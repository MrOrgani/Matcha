import React from "react";
import TextField from "@material-ui/core/TextField";

export const Passwords = props => {
  return (
    <React.Fragment>
      <TextField
        className="input"
        type="password"
        label="Old Password"
        name="oldpassword"
        variant="outlined"
        value={props.value[0]}
        onChange={props.onChange[0]}
        onBlur={props.onBlur}
      />
      <TextField
        className="input"
        type="password"
        label="New Password"
        name="newpassword"
        variant="outlined"
        value={props.value[1]}
        onChange={props.onChange[1]}
        onBlur={props.onBlur}
        disabled={props.value[0] === "" ? true : false}
        helperText={
          props.helperText[0] && props.helperText[1] && props.helperText[2]
        }
      />
    </React.Fragment>
  );
};
