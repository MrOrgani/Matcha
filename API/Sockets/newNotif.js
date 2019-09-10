const { modelNewNotif } = require("../models/modelNotif/modelNewNotif");

module.exports = async function(socket, io, notif) {
  // SI NOTIF NEST PAS UNDIFINED PASSER CETTE ETAPE
  socket.on("newNotif", data => {
    date = new Date();
    data.h = date.getHours();
    data.m = date.getMinutes();
    data.d = date.getDay();
    console.log("newNotif data", data);

    //     // PUT IT IN THE DB
    modelNewNotif(data);
    // if (socket.chatTarget.uuid && msg.uuidSource) {
    //   axios.post("http://localhost:9000/api/chatMessages/", msg);
    // console.log(msg);
    console.log("emiting a a new notif ");
    Object.keys(io.sockets.connected).map(key => {
      let elem = io.sockets.connected[key].handshake.query;
      console.log("elem uuid", elem.uuid, "data.target", data.targetUuid);
      if (elem.uuid === data.targetUuid) {
        console.log(
          "NEWNOTIF emited from the back, via socket to",
          elem.login,
          key
        );
        io.to(`${key}`).emit("newNotif", data); //emits to individual socket
      }
    });
    // io.emit("newNotif", data);
    // }
  });
  // TELL THE BROWSER IN RT IF CONNECTED

  // console.log("newNotif socket", socket);

  //     // let roomID =
  //     //   socket.chatTarget.uuid > msg.uuidSource
  //     //     ? socket.chatTarget.uuid + msg.uuidSource
  //     //     : msg.uuidSource + socket.chatTarget.uuid;
  //     // if (socket.chatTarget.uuid && msg.uuidSource) {
  //     //   axios.post("http://localhost:9000/api/chatMessages/", msg);
  //     //   // console.log(msg);
  //     //   console.log("emiting a chatMessage to all clients in room ", roomID);
  //     //   io.to(roomID).emit("chatMessage", msg);

  //     //   //NOTIF CORNER
  //     //   const notif = {
  //     //     targetUuid: socket.chatTarget.uuid,
  //     //     type: "message",
  //     //     uuidSource: msg.uuidSource
  //     //   };
  //     //   require("./newNotif")(io, notif);
  //     // }
};

// module.exports = async function( io, notif) {
// date = new Date();
// notif.h = date.getHours();
// notif.m = date.getMinutes();
// notif.d = date.getDay();

// // PUT IT IN THE DB
// modelNewNotif(notif);

// // TELL THE BROWSER IN RT IF CONNECTED
// Object.keys(io.sockets.connected).map(key => {
//   let elem = io.sockets.connected[key].handshake.query;
//   if (elem.uuid === notif.targetUuid) {
//     console.log(
//       "NEWNOTIF emited from the back, via socket to",
//       elem.login,
//       key
//     );
//     io.to(`${key}`).emit("newNotif", notif); //emits to individual socket
//   }
// });
// console.log("newNotif socket", socket);

// };
