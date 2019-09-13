const { modelNewNotif } = require("../models/modelNotif/modelNewNotif");
const { modelIsBlocked } = require("../models/modelRel/block/modelIsBlocked");
//notif is emited from front or from controllers
//it contains
//    - targetUuid, target of action
//    - type, string to describe actions
//    - uuidSource, source of the action

//NOTIFY CAN BE USED IN CONTROLLERS IN THE BACK
const notify = async notif => {
  date = new Date();
  notif.h = date.getHours();
  notif.m = date.getMinutes();
  notif.d = date.getDay();

  if (
    //IF MODEL BLOCKED ME --> DONT CREATE A NOTIF
    await modelIsBlocked({
      target: notif.uuidSource,
      uuidSource: notif.targetUuid
    })
  )
    return;

  modelNewNotif(notif);

  // SEND IT TO ALL THE SOCKETS WHO MATCH TARGET ID
  Object.keys(io.sockets.connected).map(key => {
    let elem = io.sockets.connected[key].handshake.query;
    if (elem.uuid === notif.targetUuid) io.to(`${key}`).emit("newNotif", notif); //emits to individual socket
  });
};

//ACTUAL LISTENER FOR FRONT SENT DATA
const newNotifListener = function(socket) {
  socket.on("newNotif", notif => notify(notif));
};

module.exports = {
  newNotifListener,
  notify
};
