const { modelNewMessages } = require("../models/modelChat/modelNewMessages");
// doc pour les emit ect https://socket.io/docs/emit-cheatsheet/

module.exports = function(socket, io) {
  socket.on("chatMessage", msg => {
    date = new Date();
    msg.h = date.getHours();
    msg.m = date.getMinutes();
    msg.target = socket.chatTarget.uuid;

    let roomID =
      socket.chatTarget.uuid > msg.uuidSource
        ? socket.chatTarget.uuid + msg.uuidSource
        : msg.uuidSource + socket.chatTarget.uuid;
    if (socket.chatTarget.uuid && msg.uuidSource) {
      modelNewMessages(msg); // DB
      io.to(roomID).emit("chatMessage", msg); // FRONT SOCKETS
    }
  });
};
