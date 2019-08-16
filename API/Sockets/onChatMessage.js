const axios = require("axios");

// doc pour les emit ect https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender

module.exports = function(socket, io) {
  socket.on("chatMessage", msg => {
    // console.log("received CHAT MESSAGE IN BACK: ", msg);
    date = new Date();
    msg.h = date.getHours();
    msg.m = date.getMinutes();
    msg.target = socket.chatTarget.uuid;

    let roomID =
      socket.chatTarget.uuid > msg.uuidSource
        ? socket.chatTarget.uuid + msg.uuidSource
        : msg.uuidSource + socket.chatTarget.uuid;
    if (socket.chatTarget.uuid && msg.uuidSource) {
      axios.post("http://localhost:9000/api/chatMessages/", msg);
      // console.log(msg);
      console.log("emiting to all clients in room ", roomID);
      io.to(roomID).emit("chatMessage", msg);

      //NOTIF CORNER
      const notif = {
        targetUuid: socket.chatTarget.uuid,
        type: "message",
        uuidSource: msg.uuidSource
      };
      require("./newNotif")(io, notif);
    }
  });
};
