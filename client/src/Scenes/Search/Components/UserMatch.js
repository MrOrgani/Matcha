import React, { useState, useContext, useEffect } from "react";
import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import "./Components/UserCardMatch.css";
import FakeSwipComposant from "./Components/FakeSwipComposant";
import { Spin, Icon } from "antd";

const distFrom = require("distance-from");

export default function UserMatch() {
  const [loading, setLoading] = useState(true);
  const [, authContext] = useContext(AuthContext);
  const [state, setState] = useState([]);
  const [usersValue, filtersValue] = useContext(UsersContext);

  useEffect(() => {
    const filterUsers = async (filters, users) => {
      let genderFiltered =
        !filters[0] || filters[0] === "both"
          ? users
          : users.filter(user => user.gender === filters[0]);

      if (filtersValue.tags.length > 0) {
        genderFiltered = await genderFiltered.filter(elem =>
          filters[6].every(tag => elem.hobbies.includes(tag))
        );
      }

      genderFiltered = await genderFiltered
        .filter(user => user.age >= filters[1][0] && user.age <= filters[1][1])
        .filter(
          user => user.score >= filters[2][0] && user.score <= filters[2][1]
        )
        .filter(
          user =>
            distFrom(authContext.data.location).to(user.location).distance.v <=
            filters[3]
        )
        .sort(
          (a, b) =>
            a.score * 0.6 +
            distFrom(authContext.data.location).to(a.location).distance.v -
            b.score * 0.6 +
            distFrom(authContext.data.location).to(b.location).distance.v
        )
        .slice(0, 30);

      await setState(genderFiltered);
    };
    (async () => {
      if (usersValue.matchUsers[0] === "noResult") {
        await filterUsers(
          [
            filtersValue.gender,
            filtersValue.age,
            filtersValue.pop,
            filtersValue.dist,
            filtersValue.sort,
            filtersValue.ord,
            filtersValue.tags
          ],
          usersValue.matchUsers
        );
        if (usersValue.matchUsers.length) setLoading(false);
      } else setLoading(false);
    })();
  }, [
    filtersValue,
    authContext.data.location,
    usersValue.matchUsers,
    setLoading
  ]);

  const antIcon = (
    <Icon
      type="loading"
      style={{
        fontSize: 170,
        color: "#ff8e53"
      }}
      className="spinspin"
      spin
    />
  );

  useEffect(() => {
    setState(usersValue.matchUsers);
  }, [usersValue.matchUsers]);

  function remove() {
    const leftCards = state.slice(1, state.length);
    setState(leftCards);
  }

  return (
    <div className="wrapperMatch">
      <div className="wrapperStyles">
        {!loading ? (
          state.length === 0 || usersValue.matchUsers[0] === "noResult" ? (
            <img
              alt="sold out"
              style={{ marginTop: "10px" }}
              src="https://media.giphy.com/media/l3V0C9CT3UFAQ49Jm/giphy.gif"
            />
          ) : (
            <div className="divCardsMatch">
              <UserCardProvider
                key={state[0].user_id || state[0].uuid}
                user={state[0]}
                session={authContext.data}
              >
                <FakeSwipComposant remove={remove} />
              </UserCardProvider>
            </div>
          )
        ) : (
          <Spin indicator={antIcon} className="spinspin" />
        )}
      </div>
    </div>
  );
}

// export default UserMatch;
