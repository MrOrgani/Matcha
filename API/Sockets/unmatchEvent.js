const unmatchEvent = data => {
  console.log("in the unmatched event", data);
  Object.keys(io.sockets.connected).map(key => {
    let elem = io.sockets.connected[key].handshake.query;
    if (elem.uuid === data.target) {
      console.log("in the unmatched event", data);
      io.to(`${key}`).emit("unmatched", data); //emits to individual socket
    }
  });
};

module.exports = {
  unmatchEvent
};
