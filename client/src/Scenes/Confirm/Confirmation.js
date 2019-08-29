import React, { useState, useEffect } from "react";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";
import { Modal } from "antd";
import { Spin, Icon } from "antd";

export default function Confirmation(props) {
  const [state, setState] = useState({
    confirming: true
  });

  useEffect(() => {
    const { id } = props.match.params;
    // console.log("confirmation id ", id);
    async function getConfirmEmail() {
      const resConf = await axios
        .get(`http://localhost:9000/api/user/confirm/${id}`)
        .catch(err => console.log(err));
      setState({ confirming: false });
      console.log("resConf", resConf.data.msg);
      notify.show(resConf.data.msg);
    }
    getConfirmEmail();
  }, [props.match.params]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <div>
      <Notifications />
      <Spin indicator={antIcon} />
      hello
    </div>
  );
}
