// const { session } = require("./modelUser");
const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

module.exports = async function modelFindOne(value, category, option = "") {
  const data = await session.run(
    `WITH {category} AS propname
    MATCH(u:User)
    WHERE u[propname] = $value
    ${option}
    RETURN u`,
    {
      value: value,
      category: category
    }
  );
  return data.records;
};
