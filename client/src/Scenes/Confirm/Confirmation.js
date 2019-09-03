import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Icon } from "antd";
import { Result, Button } from "antd";

export default function Confirmation(props) {
  const [state, setState] = useState({
    confirming: true,
    status: 0
  });

  useEffect(() => {
    const { id } = props.match.params;
    async function getConfirmEmail() {
      const api = `http://localhost:9000/api/user/confirm/${id}`;
      const resConf = await axios.get(api).catch(err => console.log(err));
      setTimeout(
        () =>
          setState({
            // ...state,
            confirming: false,
            status: resConf.status
          }),
        3000
      );
    }
    getConfirmEmail();
  }, [props.match.params]);

  const content = (
    <Result
      status={
        state.status === 200
          ? "success"
          : state.status === 201
          ? "warning"
          : "error"
      }
      title={
        state.status === 200
          ? "Your account has been validated."
          : state.status === 201
          ? "Your account has already been validated."
          : "Confirmation failed."
      }
      subTitle={
        state.status === 200
          ? "You may now log in."
          : state.status === 201
          ? "You can log in."
          : "This account does not exist."
      }
      extra={
        <Button type="primary" key="login">
          <a href="/">Home</a>
        </Button>
      }
    />
  );
  const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      {state.confirming ? <Spin indicator={antIcon} /> : content}
    </div>
  );
}
