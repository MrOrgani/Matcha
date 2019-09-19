const unmatchEvent = data => {
  Object.keys(io.sockets.connected).map(key => {
    let elem = io.sockets.connected[key].handshake.query;
    if (elem.uuid === data.target) {
      io.to(`${key}`).emit("unmatched", data); //emits to individual socket
    }
  });
};

module.exports = {
  unmatchEvent
};
