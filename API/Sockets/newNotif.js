const { modelNewNotif } = require("../models/modelNotif/modelNewNotif");

module.exports = async function(socket, io, notif) {
  // SI NOTIF NEST PAS UNDIFINED PASSER CETTE ETAPE
  socket.on("newNotif", data => {
    date = new Date();
    data.h = date.getHours();
    data.m = date.getMinutes();
    data.d = date.getDay();

    //     // PUT IT IN THE DB
    modelNewNotif(data);

    // SEND IT TO ALL THE SOCKETS WHO MATCH TARGET ID
    Object.keys(io.sockets.connected).map(key => {
      let elem = io.sockets.connected[key].handshake.query;
      if (elem.uuid === data.targetUuid) {
        // console.log(
        //   "NEWNOTIF emited from the back, via socket to the front",
        //   elem.login,
        //   key
        // );
        io.to(`${key}`).emit("newNotif", data); //emits to individual socket
      }
    });
  });
};
