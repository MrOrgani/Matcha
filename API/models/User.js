const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function createUser(req, res) {
  session
    .run(
      `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email}
              }) 
              RETURN u`,
      req
    )
    .then(data => {
      res.status(200).send(data);
    });
}

function findOne(req, category) {
  console.log("here1", req);
  console.log("here2", category);
  session
    .run(
      `MATCH(u:User)
        WHERE u.email = {email}
        RETURN u`,
      {
        email: req.email
      }
    )
    .then(data => {
      // console.log(data.records);
      return data.records;
    });
}

module.exports = {
  createUser,
  findOne
};
