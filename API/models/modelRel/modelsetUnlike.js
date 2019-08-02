const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

exports.modelSetUnlike = async req => {
  try {
    const data = await session.run(
      `MATCH (s:User {login:{userSource}})-[r:LIKED]->(t:User {login:{target}})
    DELETE r`,
      req
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
