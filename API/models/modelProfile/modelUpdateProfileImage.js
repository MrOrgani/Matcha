const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelUpdateProfileImage(req) {
  // console.log("modelUpdateProfileImage REQ IS", req.body);
  // REPLACE array of pics with new one
  try {
    const result = await session
      .run(
        `MATCH (u:User {login: {userSource}})
    SET u.fileList = {fileList}
    RETURN u`,
        {
          userSource: req.query.login,
          fileList: req.body.fileList
        }
      )
      .catch(err => console.log(err));
    // console.log('result of model', result.records[0]._fields[0].properties)
  } catch (err) {
    console.log('error modelUpdateProfile', err)
  }
}

module.exports = {
  modelUpdateProfileImage
};
