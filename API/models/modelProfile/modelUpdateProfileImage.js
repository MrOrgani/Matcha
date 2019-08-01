const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelUpdateProfileImage(req, res) {
  // console.log("modelUpdateProfileImage REQ IS", req.body);
  // REPLACE array of pics with new one
  try {
    await session
      .run(
        `MATCH (u:User {login: {userSource}})
    SET u.pics = {arrayURL}
    RETURN u`,
        {
          userSource: req.body.userSource,
          arrayURL: req.body.arrayURL
        }
      )
      .catch(err => res.status(400).send(err));
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  modelUpdateProfileImage
};
