const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function createUser(req, res) {
  const data = await session.run(
    `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email},
              uuid:{uuid}
              }) 
              RETURN u`,
    req
  );
  return data;
}

async function connect(value) {
  const data = await session.run(
    `MATCH(u:User)
    WHERE u.login = $value
    RETURN u`,
    {
      value
    }
  );
  return data.records[0]._fields[0].properties;
}

async function findOne(req, category) {
  const data = await session.run(
    `WITH {category} AS propname
        MATCH(u:User)
        WHERE u[toLower(propname)] = $value
        RETURN u`,
    {
      value: req,
      category: category
    }
  );
  return data.records[0];
}

module.exports = {
  createUser,
  connect,
  findOne
};
