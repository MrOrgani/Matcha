import React, { useContext, useState, useEffect } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
import { UserCardProvider } from "../../../Components/UserCards/UserCardContext";
import "./UserList.css";
import { AuthContext } from "../../../AuthContext";
import { Spin, Icon } from "antd";
import { filterUsers, sortUsers } from "./filters/filterUsers";

// ICI quand on passe en async opur filterUsers on a un bug etrange lie au
// fait qu'on attende la reponse de l'api dans UsersContext;
const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [, authContext] = useContext(AuthContext);
  const [usersValue, filtersValue] = useContext(UsersContext);
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      const result = await sortUsers(
        await filterUsers(
          filtersValue,
          usersValue.users,
          authContext.data.location
        ),
        filtersValue,
        authContext.data.location
      );
      if (!isSubscribed) return;
      setFilteredUserList(result);
      result && result.length > 0 && setLoading(false);
    })();
    return () => (isSubscribed = false);
  }, [filtersValue, usersValue, authContext.data.location]);

  //WE KEEP THE 2 MAPS TO COMPARE OPTIMISATION
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
        (() => {
          return filteredUserList.slice(0, 28).map(user => {
            return (
              <UserCardProvider
                key={user.user_id || user.uuid}
                user={user}
                session={authContext.data}
              >
                <User />
              </UserCardProvider>
            );
          });
        })()
      )}
    </div>
  );
};

export default UserList;
