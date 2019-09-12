const { modelNewMessages } = require("../models/modelChat/modelNewMessages");
// doc pour les emit ect https://socket.io/docs/emit-cheatsheet/

module.exports = function(socket, io) {
  socket.on("chatMessage", msg => {
    // console.log("received CHAT MESSAGE IN BACK: ");
    date = new Date();
    msg.h = date.getHours();
    msg.m = date.getMinutes();
    // console.log(socket.chatTarget);

    msg.target = socket.chatTarget.uuid;

    let roomID =
      socket.chatTarget.uuid > msg.uuidSource
        ? socket.chatTarget.uuid + msg.uuidSource
        : msg.uuidSource + socket.chatTarget.uuid;
    if (socket.chatTarget.uuid && msg.uuidSource) {
      // console.log("emiting a chatMessage to all clients in room ", roomID);
      modelNewMessages(msg); // DB
      // axios
      //   .post("http://localhost:9000/api/chatMessages/", msg)
      //   .catch(err => console.log("error in the axios message post", err));
      // console.log(msg);
      io.to(roomID).emit("chatMessage", msg); // FRONT SOCKETS
    }
    //   //NOTIF CORNER // ENVOYEE EN PARALELLE MAIS SEULEMENT A UNE PERSONNE CONNECTEE
    //   const notif = {
    //     targetUuid: socket.chatTarget.uuid,
    //     type: "message",
    //     uuidSource: msg.uuidSource
    //   };
    //   // console.log();
    //   io.sockets.connected[0] &&
    //     io.to(io.sockets.connected[0]).emit("newNotif", notif);
    //   // io.to(roomID).emit("newNotif", notif);
    //   // require("./newNotif")(socket, io, notif);
    // }
    // });
  });
};
