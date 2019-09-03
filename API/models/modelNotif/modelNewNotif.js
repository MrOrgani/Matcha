const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelNewNotif(req) {
  // console.log(req);
  const notifJSON = {
    d: req.d,
    h: req.h,
    m: req.m,
    uuidSource: req.uuidSource,
    targetUuid: req.targetUuid,
    type: req.type
  };
  req.newNotif = [JSON.stringify(notifJSON)]; //pas propre car reste dans l'object qui est renvoye au front
  // const arrayMessages = [JSON.stringify(messageJSON)];
  // console.log(req);
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{targetUuid}})
      SET u.notifs = u.notifs + {newNotif}`,
      req
    );
    // console.log(data.records);
    return data.records;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelNewNotif
};
