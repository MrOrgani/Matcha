exports.ChatSocket = function() {
  const app = require("../app");
  console.log(app);

  //   const io = require("socket.io")(server.server);

  //   io.sockets.on("connection", socket => {
  //     console.log("a user connected");
  //     socket
  //       .on("chat message", msg => {
  //         io.sockets.emit("chat message", msg);
  //         console.log("Message from id: " + socket.id, "with msg: ", msg);
  //       })
  //       .on("login", user => {
  //         io.sockets.emit("A new user just logged in");
  //         console.log(user);
  //       })
  //       .on("disconnect", () => console.log("A user disconnected"));
  //   });
};
