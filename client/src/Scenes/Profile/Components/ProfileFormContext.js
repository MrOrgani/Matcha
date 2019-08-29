import React, { useState } from "react";

const ProfileFormContext = React.createContext([{}, () => {}]);

const ProfileFormProvider = props => {
  const data = JSON.parse(sessionStorage.getItem("data"));
  const [state, setState] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    login: data.login,
    age: data.age,
    sexualOrientation: data.sexualOrientation,
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
