import React, { useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { FiltersContext } from "./FiltersContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    justifyContent: "space-around",
    flexFlow: "row wrap",
    display: "flex"
  }
});

const UserList = props => {
  const [
    users
    // setUsers
  ] = useContext(UsersContext);
  const classes = useStyles();
  // console.log("users", users);
  const filtered =
    !props.filters[0] || props.filters[0] === "both"
      ? users
      : users.filter(user => user.gender === props.filters[0]);
  // console.log("filter", filtered);

  const filtered2 = filtered.filter(
    user =>
      user.age.low >= props.filters[1][0] && user.age.low <= props.filters[1][1]
  );

  return (
    <div className={classes.container}>
      {filtered2.map((user, index) => (
        <User key={index} value={user} />
      ))}
    </div>
  );
};

export default UserList;
