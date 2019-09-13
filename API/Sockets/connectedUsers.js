module.exports = async function(io, connectedUsrs) {
  const uuidConnectedUsrs = Object.keys(connectedUsrs).map(
    key => connectedUsrs[key].uuid
  );
  io.emit("newConnection", uuidConnectedUsrs);
};
