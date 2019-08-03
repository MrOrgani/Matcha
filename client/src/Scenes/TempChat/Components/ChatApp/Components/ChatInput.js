import React from "react";
import "../ChatApp.css";

const ChatInput = _ => {
  console.log("chatInput");
  return (
    <form className="chat-input">
      <input
        type="text"
        // onChange={}
        // value={}
        placeholder="Write a message..."
        required
      />
    </form>
  );
};

export default ChatInput;
