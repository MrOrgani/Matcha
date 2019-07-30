import React, { useState } from "react";
// import { socket } from "../../Components/Navbar/NavBar";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Social = () => {
  const [oldMessages] = useState([]); //setOldMessages
  const initialValues = {
    msg: ""
  };

  // socket
  //   .on("chat message", msg => {
  //     console.log("new messages pushed: ", msg);
  //     setOldMessages([...oldMessages, msg]);
  //   })
  //   .on("newUsr", () => {
  //     console.log("mamen");
  //   })
  //   .on("deleteUsr", () => {
  //     console.log("deleteUsr");
  //   });

  return (
    <div>
      <ul>
        {oldMessages.map(msg => {
          return (
            <li key={msg.content}>
              {msg.content} {msg.h}:{msg.m}
            </li>
          );
        })}
      </ul>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          // socket.emit("chat message", values.msg);
          values.msg = "";
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
