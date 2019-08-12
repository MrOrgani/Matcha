module.exports = function(socket) {
  socket.on("joinRoom", chatTargetFromClient => {
    socket.chatTarget = {
      uuid: chatTargetFromClient.uuid
    }; //SECURITY HAZARD INFO FROM FRONT
    let userSourceUuid = socket.handshake.query.uuid;
    let roomID =
      socket.chatTarget.uuid > userSourceUuid
        ? socket.chatTarget.uuid.concat(userSourceUuid)
        : userSourceUuid.concat(socket.chatTarget.uuid);
    // console.log("joining room", roomID);
    socket.join(roomID);
  });
};
