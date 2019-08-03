const neo4j = require("neo4j-driver").v1;

exports.initNeo4j = () => {
  const driver = neo4j.driver(
    "bolt://localhost",
    neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
    () => console.log("connected to db")
  );
  return driver.session();
};
