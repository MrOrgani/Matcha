import React from "react";
import useProfileForm from "./../useProfileForm";

export const FirstName = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">First Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
        />
      </div>
    </div>
  );
};

export const LastName = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Last Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
        />
      </div>
    </div>
  );
};

export const Email = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Email</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={values.email}
        />
      </div>
    </div>
  );
};

export const Login = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Login</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="login"
          onChange={handleChange}
          value={values.login}
        />
      </div>
    </div>
  );
};

export const Bio = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Bio</label>
      <div className="control">
        <textarea
          className="input"
          name="bio"
          onChange={handleChange}
          value={values.bio}
        />
      </div>
    </div>
  );
};

export const Gender = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Gender</label>
      <div className="control">
        <select name="gender" onChange={handleChange} value={values.gender}>
          <option value="" />
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export const SexualOrient = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Sexual Orientation</label>
      <div className="control">
        <select
          name="sexualOrientation"
          onChange={handleChange}
          value={values.sexualOrientation}
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

export const Age = () => {
  const { handleChange, values } = useProfileForm();

  return (
    <div className="field">
      <label className="label">Age</label>
      <div className="control">
        <input
          className="input"
          type="number"
          name="age"
          onChange={handleChange}
          value={values.age}
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
