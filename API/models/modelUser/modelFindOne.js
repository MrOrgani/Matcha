// const { session } = require("./modelUser");
const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

module.exports = async function modelFindOne(value, category, option = "") {
  // FINDING ONE NODE AND RETURNING ITS PROPERTIES
  // QUERY NEEDS '' IF IT IS MATCHING A STRING
  try {
    let cypher = `
    MATCH(u:User)
    WHERE u.${category} = `;
    if (typeof value === "string") cypher += `'${value}' ${option} RETURN u`;
    else cypher += `${value} ${option} RETURN u`;
    const data = await session.run(cypher);
    return data.records;
  } catch (err) {
    console.log(err, "in model findOne");
  }
};
