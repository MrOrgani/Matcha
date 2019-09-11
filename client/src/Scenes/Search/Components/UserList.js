import React, { useContext, useState, useEffect } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { makeStyles } from "@material-ui/core/styles";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
// import { AuthContext } from "../../../AuthContext";
import "./UserList.css";
const distFrom = require("distance-from");

// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
// const session = JSON.parse(sessionStorage.getItem("data"));
const UserList = () => {
  const session = JSON.parse(sessionStorage.data);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [filteredUserList, setFilteredUserList] = useState([]);

  // const [gender, age, pop] = filtersValue;
  // console.log(filtersValue.age);
  // const filteredUserList = filterUsers(
  // [filtersValue.gender, filtersValue.age, filtersValue.pop], usersValue.users;
  // );
  // console.log("filtervales", filtersValue.tags);
  useEffect(() => {
    const filterUsers = (filters, users) => {
      const genderFiltered =
        !filters[0] || filters[0] === "both"
          ? users
          : users.filter(user => user.gender === filters[0]);
      let filtersfiltered = genderFiltered
        .filter(user => user.age >= filters[1][0] && user.age <= filters[1][1])
        .filter(
          user =>
            user.score.low >= filters[2][0] && user.score.low <= filters[2][1]
        )
        .filter(
          user =>
            distFrom(session.location).to(user.location).distance.v <=
            filters[3]
        );
      console.log("filiter6", filters[6]);
      if (filtersValue.tags.length > 0) {
        filtersfiltered = filtersfiltered.filter(
          user => user.hobbies.indexOf(filters[6][0]) > -1
        );
        console.log(filtersfiltered);
      }
      if (filtersValue.sort) {
        if (filters[4] === "age")
          setFilteredUserList(
            filtersfiltered.sort((a, b) =>
              filters[5]
                ? parseFloat(a.age) - parseFloat(b.age)
                : parseFloat(b.age) - parseFloat(a.age)
            )
          );
        else if (filters[4] === "pop")
          setFilteredUserList(
            filtersfiltered.sort((a, b) =>
              filters[5]
                ? parseFloat(a.score.low) - parseFloat(b.score.low)
                : parseFloat(b.score.low) - parseFloat(a.score.low)
            )
          );
        else if (filters[4] === "dist")
          setFilteredUserList(
            filtersfiltered.sort((a, b) =>
              filters[5]
                ? parseFloat(
                    distFrom(session.location).to(a.location).distance.v
                  ) -
                  parseFloat(
                    distFrom(session.location).to(b.location).distance.v
                  )
                : parseFloat(
                    distFrom(session.location).to(b.location).distance.v
                  ) -
                  parseFloat(
                    distFrom(session.location).to(a.location).distance.v
                  )
            )
          );
      } else setFilteredUserList(filtersfiltered);
    };
    filterUsers(
      [
        filtersValue.gender,
        filtersValue.age,
        filtersValue.pop,
        filtersValue.dist,
        filtersValue.sort,
        filtersValue.ord,
        filtersValue.tags
      ],
      usersValue.users
    );
  }, [filtersValue, usersValue]);

  // filteredUserList.map(user =>
  //   console.log(distFrom(session.location).to(user.location).distance.v)
  // );
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
