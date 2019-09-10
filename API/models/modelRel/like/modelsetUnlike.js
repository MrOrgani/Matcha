const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

exports.modelSetUnlike = async req => {
  try {
    const data = await session.run(
      `MATCH (s:User {uuid:{uuidSource}})-[r:LIKED]->(t:User {uuid:{target}})
    DELETE r`,
      req
    );
    return data;
  } catch (err) {
    console.log("in model setUnlike", err, req);
  }
};
