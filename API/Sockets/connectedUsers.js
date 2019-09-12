module.exports = async function(io, connectedUsrs) {
  const uuidConnectedUsrs = Object.keys(connectedUsrs).map(key => {
    return connectedUsrs[key].uuid;
  });
  console.log("connection change, sending to the front: ", uuidConnectedUsrs);
  io.emit("newConnection", uuidConnectedUsrs);
};
