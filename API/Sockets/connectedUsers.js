module.exports = async function(io, connectedUsrs) {
  io.emit("connection", connectedUsrs);
};
