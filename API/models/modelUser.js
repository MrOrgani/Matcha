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
              email:{email}
              }) 
              RETURN u`,
    req
  );
  return data;
  // .then(data => {
  //   res.status(200).send(data);
  // });
}

async function connect(req) {
  console.log(req);
  const data = await session.run(
    `MATCH(u:User)
      WHERE u.login = $login 
        AND u.password = $password
      RETURN u`,
    req
  );
  return data;
}

function findOne(req, category) {
  return session
    .run(
      `WITH {category} AS propname
        MATCH(u:User)
        WHERE u[toLower(propname)] = $value
        RETURN u`,
      {
        value: req,
        category: category
      }
    )
    .then(data => {
      return data.records;
    });
}

module.exports = {
  createUser,
  connect,
  findOne
};
