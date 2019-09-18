import React, { useState, useContext, useEffect } from "react";
import Swipeable from "react-swipy";

import Card from "./Components/Card";
import Button from "./Components/Button";
import UserCardMatch from "./Components/UserCardMatch";

import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import "./Components/UserCardMatch.css";

const distFrom = require("distance-from");

export default function UserMatch() {
  //import les profile
  const [, authContext] = useContext(AuthContext);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [filteredUserList, setFilteredUserList] = useState([]);

  // console.log("authcontex", authContext);
  useEffect(() => {
    const filterUsers = (filters, users) => {
      // const location = JSON.parse(sessionStorage.data).location;
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
            distFrom(authContext.data.location).to(user.location).distance.v <=
            filters[3]
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
                ? parseFloat(a.score.low) - parseFloat(b.score.low)
                : parseFloat(b.score.low) - parseFloat(a.score.low)
            )
          );
        else if (filters[4] === "dist") {
          setFilteredUserList(
            filtersfiltered.sort((a, b) =>
              filters[5]
                ? parseFloat(
                    distFrom(authContext.data.location).to(a.location).distance
                      .v
                  ) -
                  parseFloat(
                    distFrom(authContext.data.location).to(b.location).distance
                      .v
                  )
                : parseFloat(
                    distFrom(authContext.data.location).to(b.location).distance
                      .v
                  ) -
                  parseFloat(
                    distFrom(authContext.data.location).to(a.location).distance
                      .v
                  )
            )
          );
        }
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
  }, [filtersValue, usersValue, authContext.data.location]);

  useEffect(() => {
    setState(filteredUserList);
  }, [filteredUserList]);

  const [state, setState] = useState(filteredUserList);

  function remove() {
    const leftCards = state.slice(1, state.length);
    setState(leftCards);
  }

  return (
    <div className="wrapperMatch">
      <div className="wrapperStyles">
        {state.length > 0 ? (
          <div>
            <Swipeable
              buttons={({ left, right }) => (
                <div className="actionsStyles">
                  <Button onClick={left}>Reject</Button>
                  <Button onClick={right}>Accept</Button>
                </div>
              )}
              onAfterSwipe={remove}
            >
              {/* <Card>{cards[0]}</Card> */}
              <UserCardProvider
                key={state[0].user_id || state[0].uuid}
                user={state[0]}
                session={authContext.data}
              >
                <UserCardMatch />
              </UserCardProvider>
            </Swipeable>
          </div>
        ) : (
          <img
            style={{ marginTop: "10px" }}
            src="https://media.giphy.com/media/l3V0C9CT3UFAQ49Jm/giphy.gif"
          />
        )}
      </div>
    </div>
  );
}

// export default UserMatch;
