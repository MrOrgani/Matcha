const { modelIsLiked } = require("./modelIsLiked");
const { modelIsMatched } = require("../match/modelIsMatched");
const { modelSetMatched } = require("../match/modelSetMatched");
const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetLike(req) {
  try {
    if (
      await (() => {
        session.run(
          `MATCH (s:User {uuid:{uuidSource}}), (t:User {uuid:{target}})
          MERGE (s)-[r:LIKED]->(t)`,
          req
        );
        if (
          modelIsLiked({ uuidSource: req.target, target: req.uuidSource }) &&
          !modelIsMatched(req)
        )
          return true;
      })()
    )
      modelSetMatched(req);
  } catch (err) {
    console.log("Error modelSetLike", err, req);
    res.status(400).send();
  }
}

module.exports = {
  modelSetLike
};
