// const { io } = require("../app");

// const Sockets = function() {
//   // SOCKET MANAGEMENT FOR RT CHAT
//   const connectedUsrs = {};
//   console.log(io);
//   // ABOUT LOGIN AND CONNECTION :
//   // IF CONNECTION AND CONNECTION ON OTHER TAB ADN ONE DISCTONNECT --> OTHER DISCONNECTED
//   // MAYBE : NOT ALLOW CONNECTION WHEN CONNECTED OR CHECK IF CONNECTED

//   io.sockets.on("connect", socket => {
//     // const chatTarget = {};
//     connectedUsrs[socket.id] = socket.handshake.query;
//     const disconnectUser = _ => {
//       if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
//     };

//     socket.on("joinRoom", chatTargetFromClient => {
//       socket.chatTarget = {
//         uuid: chatTargetFromClient.uuid
//       }; //SECURITY HAZARD INFO FROM FRONT
//       let userSourceUuid = connectedUsrs[socket.id].uuid;
//       // console.log(
//       //   "JOINJOIN chatTarget :",
//       //   chatTarget.uuid,
//       //   typeof chatTarget.uuid,
//       //   "userSourceUuid :",
//       //   userSourceUuid,
//       //   typeof userSourceUuid
//       // );

//       let roomID =
//         socket.chatTarget.uuid > userSourceUuid
//           ? socket.chatTarget.uuid.concat(userSourceUuid)
//           : userSourceUuid.concat(socket.chatTarget.uuid);
//       // console.log("joining room", roomID);
//       socket.join(roomID);
//     });

//     const axios = require("axios");
//     socket
//       .on("chatMessage", msg => {
//         // console.log("received CHAT MESSAGE IN BACK: ", msg);
//         let userSourceUuid = msg.uuidSource;
//         date = new Date();
//         msg.h = date.getHours();
//         msg.m = date.getMinutes();
//         msg.target = socket.chatTarget.uuid;

//         let roomID =
//           socket.chatTarget.uuid > msg.uuidSource
//             ? socket.chatTarget.uuid + msg.uuidSource
//             : msg.uuidSource + socket.chatTarget.uuid;
//         if (socket.chatTarget.uuid && msg.uuidSource) {
//           axios.post("http://localhost:9000/api/chatMessages/", msg);
//           // console.log(msg);
//           // console.log("emiting to all clients in room ", roomID);
//           io.to(roomID).emit("chatMessage", msg);
//         }
//       })
//       .on("logOut", disconnectUser)
//       .on("disconnect", reason => {
//         // console.log("disconnnnnnnnnnect, reason is:", reason);
//         disconnectUser(reason);
//       });
//   });
// };

// module.exports = {
//   Sockets
// };
