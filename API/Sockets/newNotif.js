const { modelFindOne } = require("../models/modelUser");
const { modelNewNotif } = require("../models/modelNotif/modelNewNotif");

module.exports = async function(io, notif) {
  date = new Date();
  notif.h = date.getHours();
  notif.m = date.getMinutes();
  notif.d = date.getDay();

  // PUT IT IN THE DB
  console.log("notif put in the db from the back");
  modelNewNotif(notif);

  // TELL THE BROWSER IN RT IF CONNECTED
  Object.keys(io.sockets.connected).map(key => {
    // console.log(key);
    let elem = io.sockets.connected[key].handshake.query;
    // console.log(elem);
    if (elem.uuid === notif.targetUuid) {
      console.log(
        "NEWNOTIF emited from the back, via socket to",
        elem.login,
        key
      );
      io.to(`${key}`).emit("newNotif", notif); //emits to individual socket
    }
  });
};
