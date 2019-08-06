import React, { useState } from "react";
import "../ChatApp.css";
// import TextField from "@material-ui/core/TextField";

const ChatInput = props => {
  const [chatInput, setChatInput] = useState("");

  const handleChange = e => {
    setChatInput(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    props.onSend(chatInput);
    setChatInput("");
  };

  return (
    <form className="chat-input" onSubmit={submitHandler}>
      {/* <TextField
        label="login"
        name="login"
        // value={values.login}
        // onChange={handleChange}
        // onBlur={handleBlur}
        // helperText={errors.login && touched.login && errors.login}
        margin="normal"
      /> */}
      <input
        type="text"
        onChange={handleChange}
        value={chatInput}
        placeholder="Write a message..."
        required
      />
    </form>
  );
};

export default ChatInput;
