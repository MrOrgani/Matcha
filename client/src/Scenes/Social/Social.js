import React, { useState } from "react";
import { socket } from "../../App";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Social = () => {
  const [oldMessages, setOldMessages] = useState([]);
  const initialValues = {
    msg: ""
  };

  socket.on("chat message", msg => {
    console.log("new messages pushed: ", msg);
    setOldMessages([...oldMessages, msg]);
  });

  return (
    <div>
      <ul>
        {oldMessages.map(msg => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          //   console.log(values);
          socket.emit("chat message", values.msg);
        }}
      >
        {props => {
          const { values, handleChange, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                label="message"
                name="msg"
                onChange={handleChange}
                value={values.msg}
              />
              <Button type="submit">Send</Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Social;
