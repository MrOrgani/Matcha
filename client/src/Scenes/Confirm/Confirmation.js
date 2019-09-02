import React, { useState, useEffect } from "react";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";
import { Modal } from "antd";
import { Spin, Icon } from "antd";
import { Result, Button } from "antd";

export default function Confirmation(props) {
  const [state, setState] = useState({
    confirming: true,
    status: 0
  });

  // console.log(state);

  useEffect(() => {
    const { id } = props.match.params;
    async function getConfirmEmail() {
      const api = `http://localhost:9000/api/user/confirm/${id}`;
      const resConf = await axios.get(api).catch(err => console.log(err));
      // console.log("resConf", await resConf);
      setTimeout(
        () =>
          setState({
            ...state,
            confirming: false,
            status: resConf.status
          }),
        3000
      );
      // notify.show(resConf.data.msg);
    }
    getConfirmEmail();
  }, [props.match.params]);

  const success = (
    <Result
      status="success"
      title="Your account has been validated."
      subTitle="You may now log in."
      extra={
        <Button type="primary" key="login">
          <a href="/">Home</a>
        </Button>
      }
    />
  );
  const warning = (
    <Result
      status="warning"
      title="Your account has already been validated."
      extra={
        <Button type="primary" key="console">
          <a href="/">Home</a>
        </Button>
      }
    />
  );
  const error = (
    <Result
      status="error"
      title="Confirmation Failed"
      subTitle="This account does not exist."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>
      ]}
    />
  );

  const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      {state.confirming ? (
        <Spin indicator={antIcon} />
      ) : state.status === 200 ? (
        success
      ) : state.status === 201 ? (
        warning
      ) : (
        error
      )}
    </div>
  );
}
