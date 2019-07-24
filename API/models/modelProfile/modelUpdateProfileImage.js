const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelUpdateProfileImage(req) {
  console.log("modelUpdateProfileImage", req);

  if (req.body.addPic) {
    const data = await session.run(
      `MATCH (u:User {login: {userSource}})
    SET u.pics = u.pics + {url}
    RETURN u`,
      {
        userSource: req.userSource,
        url: req.imageAdd[0].secure_url
      }
    );
  }
  console.log("DAAAAAATAAAA", data.records);
  return data.records;
}

module.exports = {
  modelUpdateProfileImage
};
