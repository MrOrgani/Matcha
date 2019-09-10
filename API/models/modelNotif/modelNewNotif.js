const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelNewNotif(req) {
  const notifJSON = {
    d: req.d,
    h: req.h,
    m: req.m,
    uuidSource: req.uuidSource,
    targetUuid: req.targetUuid,
    type: req.type
  };
  req.newNotif = [JSON.stringify(notifJSON)]; //pas propre car reste dans l'object qui est renvoye au front

  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{targetUuid}})
      SET u.notifs = u.notifs + {newNotif}`,
      req
    );
    return data.records;
  } catch (err) {
    console.log("error in NewNotif", err, req.body);
  }
}

module.exports = {
  modelNewNotif
};
