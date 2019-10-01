import React, { useState, useContext, useEffect } from "react";
import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import "./Components/UserCardMatch.css";
import FakeSwipComposant from "./Components/FakeSwipComposant";
import { Spin, Icon } from "antd";
const { filterUsers } = require("./filters/filterUsers");

export default function UserMatch() {
  const [loading, setLoading] = useState(true);
  const [, authContext] = useContext(AuthContext);
  const [state, setState] = useState([]);
  const [usersValue, filtersValue] = useContext(UsersContext);

  useEffect(() => {
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
          usersValue.matchUsers,
          authContext.data.location
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
