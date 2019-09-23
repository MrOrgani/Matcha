const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const low = require("../low");

exports.modelChat = async req => {
  try {
    // console.log("modelChat", req);
    let cypher = `MATCH (s:User `;
    cypher += req.s !== "User" ? `{uuid:{uuidSource}})-` : `)-`;
    cypher +=
      req.r === "MATCHED" ? `[r:${req.r}]-(t:User ` : `[r:${req.r}]->(t:User `;
    cypher += req.t !== "User" ? `{uuid:{uuid}}) RETURN ` : `) RETURN `;
    cypher += `${req.w}`;

    const result = await session.run(cypher, req);
    return result.records;
  } catch (err) {
    console.log("error in modelChat", err);
  }
};
