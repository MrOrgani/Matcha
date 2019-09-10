import React, { useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { makeStyles } from "@material-ui/core/styles";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
// import { AuthContext } from "../../../AuthContext";
import "./UserList.css";

const filterUsers = (props, users) => {
  const genderFiltered =
    !props.filters[0] || props.filters[0] === "both"
      ? users
      : users.filter(user => user.gender === props.filters[0]);

  const ageFiltered = genderFiltered.filter(
    user => user.age >= props.filters[1][0] && user.age <= props.filters[1][1]
  );
  return ageFiltered;
};

// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
// const session = JSON.parse(sessionStorage.getItem("data"));
const UserList = props => {
  const session = JSON.parse(sessionStorage.data);
  const [users] = useContext(UsersContext);
  const filteredUserList = filterUsers(props, users);
  // console.log("users in UserList", filteredUserList);

  return (
    <div className="containerUL">
      {filteredUserList.map(user => {
        return (
          <UserCardProvider
            key={user.user_id || user.uuid}
            user={user}
            session={session}
          >
            <User />
          </UserCardProvider>
        );
      })}
    </div>
  );
};

export default UserList;
