module.exports = function(socket, io, notif) {
  console.log("entering new notif with notif:", notif);
  //   console.log(io.sockets.connected);
  date = new Date();
  notif.h = date.getHours();
  notif.m = date.getMinutes();
  notif.d = date.getDay();

  //   console.log(Object.keys(io.sockets.connected));
  Object.keys(io.sockets.connected).forEach(key => {
    let elem = io.sockets.connected[key].handshake.query;
    console.log(key, elem);
    if (elem.uuid === notif.targetUuid) {
      io.to(`${key}`).emit("newNotif", notif);
      console.log("new notif emitted", notif);
    }
  });
  //   console.log("newNotif, CONNECTED SOCKETS:", io.sockets.connected);
};
