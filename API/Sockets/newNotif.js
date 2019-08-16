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
    console.log(key);
    let elem = io.sockets.connected[key].handshake.query;
    // console.log(elem);
    if (elem.uuid === notif.targetUuid) {
      console.log("notif emited from the back, via socket", key);
      io.to(`${key}`).emit("newNotif", notif); //emits to individual socket
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
