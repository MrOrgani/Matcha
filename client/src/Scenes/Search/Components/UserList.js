import React, { useContext } from "react";
import User from "./UserCards/User";
import { UsersContext } from "./UsersContext";
// import { FiltersContext } from "./FiltersContext";
import { makeStyles } from "@material-ui/core/styles";
import { UserCardProvider } from "./UserCards/UserCardContext";

const useStyles = makeStyles({
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    justifyContent: "space-around",
    flexFlow: "row wrap",
    display: "flex"
  }
});

const filterUsers = (props, users) => {
  // console.log("users", users);
  const genderFiltered =
    !props.filters[0] || props.filters[0] === "both"
      ? users
      : users.filter(user => user.gender === props.filters[0]);
  // console.log("filter", filtered);

  const ageFiltered = genderFiltered.filter(
    user =>
      user.age.low >= props.filters[1][0] && user.age.low <= props.filters[1][1]
  );
  return ageFiltered;
};

// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
const UserList = props => {
  const [users] = useContext(UsersContext);
  const classes = useStyles();

  const filteredUserList = filterUsers(props, users);
  return (
    <div className={classes.container}>
      {filteredUserList.map((user, index) => (
        <UserCardProvider key={`Card${index}`} user={user}>
          <User />
        </UserCardProvider>
      ))}
    </div>
  );
};

export default UserList;
