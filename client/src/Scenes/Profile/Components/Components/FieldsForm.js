import React from "react";
import useProfileForm from "./../useProfileForm";
import TextField from "@material-ui/core/TextField";

export const FirstName = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    // <div className="field">
    // <label className="label">First Name</label>
    // <div className="control">
    <TextField
      className="input"
      type="text"
      name="firstName"
      onChange={props.props[2]}
      value={props.props[0].firstName}
      onBlur={props.props[1]}
      helperText={
        props.props[3].firstName &&
        props.props[4].firstName &&
        props.props[3].firstName
      }
    />
    // </div>
    // </div>
  );
};

export const LastName = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Last Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="lastName"
          onChange={props.props[2]}
          value={props.props[0].lastName}
          onBlur={props.props[1]}
        />
      </div>
    </div>
  );
};

export const Email = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Email</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="lastName"
          onChange={props.props[2]}
          value={props.props[0].email}
          onBlur={props.props[1]}
        />
      </div>
    </div>
  );
};

export const Login = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Login</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="login"
          onChange={props.props[2]}
          value={props.props[0].login}
          onBlur={props.props[1]}
        />
      </div>
    </div>
  );
};

export const Bio = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Bio</label>
      <div className="control">
        <textarea
          className="input"
          name="bio"
          onChange={props.props[2]}
          value={props.props[0].bio}
          onBlur={props.props[1]}
        />
      </div>
    </div>
  );
};

export const Gender = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Gender</label>
      <div className="control">
        <select
          name="gender"
          onChange={props.props[2]}
          value={props.props[0].gender}
          onBlur={props.props[1]}
        >
          <option value="" />
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export const SexualOrient = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Sexual Orientation</label>
      <div className="control">
        <select
          name="sexualOrientation"
          onChange={props.props[2]}
          value={props.props[0].sexualOrient}
          onBlur={props.props[1]}
        >
          <option value="" />
          <option value="bi">Bi</option>
          <option value="straight">Straight</option>
          <option value="gay">Gay</option>
        </select>
      </div>
    </div>
  );
};

export const Age = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Age</label>
      <div className="control">
        <input
          className="input"
          type="number"
          name="age"
          onChange={props.props[2]}
          value={props.props[0].age}
          onBlur={props.props[1]}
        />
      </div>
    </div>
  );
};

export const Submit = () => {
  return (
    <button type="submit" className="button is-block is-info is-fullwidth">
      Submit
    </button>
  );
};
