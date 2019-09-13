const { modelNewNotif } = require("../models/modelNotif/modelNewNotif");
//data is emited from front or from controllers
//it contains
//    - targetUuid, target of action
//    - type, string to describe actions
//    - uuidSource, source of the action

//NOTIFY CAN BE USED IN CONTROLLERS IN THE BACK
const notify = data => {
  // console.log(data);
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
};

//ACTUAL LISTENER FOR FRONT SENT DATA
const newNotifListener = async function(socket) {
  socket.on("newNotif", data => notify(data));
};

module.exports = {
  newNotifListener,
  notify
};
