import React, { useState } from "react";
// import { socket } from "../../Components/Navbar/NavBar";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// envoyer message dans une room en instant,
// Listen les event dansune room en instant,
// --> avoir le nom des rooms pre-definis dans le chat
// --> join a chaque clique et listen et emmetre des messages depuis ca

// Envoyer et trouver les vieux messages

const Social = () => {
  const [oldMessages] = useState([]); //setOldMessages
  const initialValues = {
    msg: ""
  };

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
