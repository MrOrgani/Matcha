import React, { useContext, useState, useEffect } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { makeStyles } from "@material-ui/core/styles";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
// import { AuthContext } from "../../../AuthContext";
import "./UserList.css";

// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
// const session = JSON.parse(sessionStorage.getItem("data"));
const UserList = () => {
  const session = JSON.parse(sessionStorage.data);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    const filterUsers = (filters, users) => {
      const genderFiltered =
        !filters[0] || filters[0] === "both"
          ? users
          : users.filter(user => user.gender === filters[0]);

      setFilteredUserList(
        genderFiltered.filter(
          user => user.age >= filters[1][0] && user.age <= filters[1][1]
        )
        // .filter(
        //   user =>
        //     user.score.low >= filters[2][0] && user.score.low <= filters[2][1]
        // )
      );
    };
    filterUsers(
      [filtersValue.gender, filtersValue.age, filtersValue.pop],
      usersValue.users
    );
  }, [filtersValue, usersValue]);

  console.log("USERLIST filtereduserlist", filteredUserList);
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
