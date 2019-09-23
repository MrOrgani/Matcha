const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const low = require("../low");

const formate = arr => {
  return arr.records.map(node => {
    const oneUser = low(node._fields[0].properties);
    const now = new Date();
    // oneUser.lastConnection = date.format(now, "ddd MMM DD YYYY");
    return oneUser;
  });
};

exports.modelChat = async req => {
  try {
    // console.log("modelChat", req);
    let cypher = `MATCH (s:User `;
    cypher += req.s !== "User" ? `{uuid:{uuidSource}})-` : `)-`;
    cypher +=
      req.r === "MATCHED" ? `[r:${req.r}]-(t:User ` : `[r:${req.r}]->(t:User `;
    cypher += req.t !== "User" ? `{uuid:{uuid}}) RETURN ` : `) RETURN `;
    cypher += `${req.w}`;

    return await formate(await session.run(cypher, req));
    // return result.records;
  } catch (err) {
    console.log("error in modelChat", err);
  }
};
