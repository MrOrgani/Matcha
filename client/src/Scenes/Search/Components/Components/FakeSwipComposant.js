import React, { useContext } from "react";
// import Button from "./Button";
import UserCardMatch from "./UserCardMatch";
import { UserCardContext } from "./../../../../Components/UserCards/UserCardContext";
import { Icon } from "antd";

export default function FakeSwipComposant(props) {
  const [, handleLike, , ,] = useContext(UserCardContext);

  return (
    <React.Fragment>
      <UserCardMatch />
      <div className="actionsStyles">
        <div onClick={props.remove} style={{ cursor: "pointer" }}>
          <Icon style={{ fontSize: "5em", color: "red" }} type="close" />
        </div>
        <div
          onClick={async () => {
            await handleLike();
            props.remove();
          }}
          style={{ cursor: "pointer" }}
        >
          <Icon style={{ fontSize: "5em", color: "green" }} type="check" />
        </div>
      </div>
    </React.Fragment>
  );
}
