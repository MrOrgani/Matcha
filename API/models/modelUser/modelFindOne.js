// const { session } = require("./modelUser");
const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

const low = require("../low");
module.exports = async function modelFindOne(value, category, option = "") {
  // FINDING ONE NODE AND RETURNING ITS PROPERTIES
  // QUERY NEEDS '' IF IT IS MATCHING A STRING
  // console.log("in modelf FindOne", value, category, option);
  try {
    let cypher = `
    MATCH(u:User)
    WHERE u.${category} = `;
    if (typeof value === "string") cypher += `'${value}' ${option} RETURN u`;
    else cypher += `${value} ${option} RETURN u`;
    // console.log("cypher", cypher);
    const data = await session.run(cypher).then(elem => {
      return elem.records.length > 0
        ? low(elem.records[0]._fields[0].properties)
        : [];
    });

    return data;
  } catch (err) {
    console.log(err, "in model findOne");
  }
};
