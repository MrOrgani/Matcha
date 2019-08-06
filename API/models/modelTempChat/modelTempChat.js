const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

exports.modelTempChat = async req => {
  try {
    let cypher = `MATCH (s:User `;
    cypher += req.s !== "User" ? `{login:{userSource}})-` : `)-`;
    cypher +=
      req.r === "MATCHED" ? `[r:${req.r}]-(t:User ` : `[r:${req.r}]->(t:User `;
    cypher += req.t !== "User" ? `{login:{userSource}}) RETURN ` : `) RETURN `;
    cypher += `${req.w}`;

    const result = await session.run(cypher, req);
    return result.records;
  } catch (err) {
    console.log(err);
  }
};
