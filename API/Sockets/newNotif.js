const { modelFindOne } = require("../models/modelUser");

module.exports = async function(io, notif) {
  // console.log("entering new notif with notif:", notif);
  //   console.log(io.sockets.connected);
  date = new Date();
  notif.h = date.getHours();
  notif.m = date.getMinutes();
  notif.d = date.getDay();

  Object.keys(io.sockets.connected).map(key => {
    let elem = io.sockets.connected[key].handshake.query;
    if (elem.uuid === notif.targetUuid) {
      io.to(`${key}`).emit("newNotif", notif);
      console.log("notif !! ", notif);
      // ConcernedUsersockets.push(key);
    }
  });

  //   console.log(Object.keys(io.sockets.connected));
  // console.log(notif);
  // const notifSource = await modelFindOne(notif.uuidSource, "uuid");

  // delete notifSource[0]._fields[0].properties.password;
  // delete notif.uuidSource;
  // notif.source = notifSource[0]._fields[0].properties;
  // console.log(
  //   "notifSource",
  //   notifSource[0]._fields[0].properties,
  //   "Concerned Users",
  //   ConcernedUsersockets,
  //   "notif ",
  //   notif
  // );

  // const promises = await Object.keys(io.sockets.connected).map(key => {
  //   let elem = io.sockets.connected[key].handshake.query;
  //   // console.log(key, elem);
  //   if (elem.uuid === notif.targetUuid) {
  //     const response = modelFindOne(notif.targetUuid, "uuid");
  //     // delete .password;
  //     // console.log(response);
  //     // io.to(`${key}`).emit("newNotif", result);
  //     // response.key = key;
  //     keyArray.push(key);
  //     // console.log("response in newNotif", response);
  //     return response;
  //     // console.log("new notif emitted", result);
  //   }
  //   // return true;
  // });

  // console.log("promise in newNotif", promises, "key Array = ", keyArray);

  // const result = await Promise.all(promises);
  // keyArray.map(elem => {

  // }
  // Object.keys(result).map(key => {
  //   console.log("in the results in NewNotif", result[key]);
  //   if (result[key]) {
  //     let endResult = result[key][0]._fields[0].properties;
  //     console.log(endResult);
  //     delete endResult.password;
  //     io.to(`${result[key].key}`).emit("newNotif", endResult);
  //   }
  // });
  // delete result.password;
  // // console.log(result);
  // io.to(`${result.key}`).emit("newNotif", result);
  //   console.log("newNotif, CONNECTED SOCKETS:", io.sockets.connected);
};
