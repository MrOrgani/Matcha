import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";

const ProfileFormContext = React.createContext([{}, () => {}]);

const ProfileFormProvider = props => {
  const [, authContext] = useContext(AuthContext);
  const data = authContext.data;
  // console.log("authcontext", authContext, "data", data);
  const [state, setState] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    login: data.login,
    age: data.age,
    lookingFor: data.lookingFor,
    bio: data.bio,
    pics: data.pics,
    indexOfPP: data.indexOfPP,
    hobbies: data.hobbies,
    location: [data.location[0], data.location[1]],
    city: data.city,
    oldpassword: "",
    newpassword: ""
  });

  return (
    <ProfileFormContext.Provider value={[state, setState]}>
      {props.children}
    </ProfileFormContext.Provider>
  );
};

export { ProfileFormContext, ProfileFormProvider };
