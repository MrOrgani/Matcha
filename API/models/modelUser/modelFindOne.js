const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

const low = require("../low");
module.exports = async function modelFindOne(value, category, option = "") {
  // FINDING ONE NODE AND RETURNING ITS PROPERTIES
  // QUERY NEEDS '' IF IT IS MATCHING A STRING
  let Vstring = typeof value === "string" ? true : false;
  await (() => {
    value = escape(value);
    category = escape(category);
  })();
  try {
    let cypher = `
    MATCH(u:User)
    WHERE u.${category} = `;
    if (Vstring) cypher += `'${value}' ${option} RETURN u`;
    else cypher += `${value} ${option} RETURN u`;
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
