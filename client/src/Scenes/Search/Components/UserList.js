import React, { useContext, useState, useEffect } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import { Spin, Icon } from "antd";

const distFrom = require("distance-from");
// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [, authContext] = useContext(AuthContext);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    const filterUsers = async (filters, users) => {
      await (() => {
        const genderFiltered =
          !filters[0] || filters[0] === "both"
            ? users
            : users.filter(user => user.gender === filters[0]);

        let filtersfiltered = genderFiltered
          .filter(
            user => user.age >= filters[1][0] && user.age <= filters[1][1]
          )
          .filter(
            user => user.score >= filters[2][0] && user.score <= filters[2][1]
          )
          .filter(
            user =>
              distFrom(authContext.data.location).to(user.location).distance
                .v <= filters[3]
          );

        if (filtersValue.tags.length > 0) {
          filtersfiltered = filtersfiltered.filter(elem =>
            filters[6].every(tag => elem.hobbies.includes(tag))
          );
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
                  ? parseFloat(a.score) - parseFloat(b.score)
                  : parseFloat(b.score) - parseFloat(a.score)
              )
            );
          else if (filters[4] === "dist") {
            setFilteredUserList(
              filtersfiltered.sort((a, b) =>
                filters[5]
                  ? parseFloat(
                      distFrom(authContext.data.location).to(a.location)
                        .distance.v
                    ) -
                    parseFloat(
                      distFrom(authContext.data.location).to(b.location)
                        .distance.v
                    )
                  : parseFloat(
                      distFrom(authContext.data.location).to(b.location)
                        .distance.v
                    ) -
                    parseFloat(
                      distFrom(authContext.data.location).to(a.location)
                        .distance.v
                    )
              )
            );
          }
        } else setFilteredUserList(filtersfiltered);
      })();

      filteredUserList.length > 0 && setLoading(false);
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
  }, [
    filtersValue,
    usersValue,
    authContext.data.location,
    filteredUserList.length
  ]);

  //WE KEEP THE 2 MAPS TO COMPARE OPTIMISATION
  const antIcon = (
    <Icon
      type="loading"
      style={{
        fontSize: 170,
        color: "#ff8e53"
        // color: "#fe6b8b"
      }}
      className="spinspin"
      spin
    />
  );
  return (
    <div className="containerUL">
      {loading ? (
        usersValue.users[0] === "noResult" ? (
          <p>
            This functionnality is not effective as there are no users in the
            database
          </p>
        ) : (
          <Spin indicator={antIcon} className="spinspin" />
        )
      ) : (
        filteredUserList.slice(0, 28).map(user => {
          return (
            <UserCardProvider
              key={user.user_id || user.uuid}
              user={user}
              session={authContext.data}
            >
              <User />
            </UserCardProvider>
          );
        })
      )}
    </div>
  );
};

export default UserList;
