import React, { useState, useContext, useEffect } from "react";

import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import "./Components/UserCardMatch.css";
import FakeSwipComposant from "./Components/FakeSwipComposant";

const distFrom = require("distance-from");

export default function UserMatch() {
  const [, authContext] = useContext(AuthContext);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    const filterUsers = (filters, users) => {
      let genderFiltered =
        !filters[0] || filters[0] === "both"
          ? users
          : users.filter(user => user.gender === filters[0]);

      genderFiltered = genderFiltered
        .filter(user => user.age >= filters[1][0] && user.age <= filters[1][1])
        .filter(
          user =>
            user.score.low >= filters[2][0] && user.score.low <= filters[2][1]
        )
        .filter(
          user =>
            distFrom(authContext.data.location).to(user.location).distance.v <=
            filters[3]
        )
        .sort(
          (a, b) =>
            a.score.low * 0.6 +
            distFrom(authContext.data.location).to(a.location).distance.v -
            b.score.low * 0.6 +
            distFrom(authContext.data.location).to(b.location).distance.v
        );
      if (filtersValue.tags.length > 0) {
        genderFiltered = genderFiltered.filter(elem =>
          filters[6].every(tag => elem.hobbies.includes(tag))
        );
      }

      // console.log("We setState this array", [genderFiltered]);

      setState(genderFiltered);
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
  }, [filtersValue, authContext.data.location, usersValue.users]);

  useEffect(() => {
    // console.log("NEW USERS", usersValue);
    setState(usersValue.users);
  }, [usersValue.users]);

  console.log("users in state", state);

  function remove() {
    const leftCards = state.slice(1, state.length);
    setState(leftCards);
  }

  return (
    <div className="wrapperMatch">
      <div className="wrapperStyles">
        {state.length > 0 ? (
          <div>
            <UserCardProvider
              key={state[0].user_id || state[0].uuid}
              user={state[0]}
              session={authContext.data}
            >
              <FakeSwipComposant remove={remove} />
            </UserCardProvider>
          </div>
        ) : (
          <img
            alt="sold out"
            style={{ marginTop: "10px" }}
            src="https://media.giphy.com/media/l3V0C9CT3UFAQ49Jm/giphy.gif"
          />
        )}
      </div>
    </div>
  );
}

// export default UserMatch;
