const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelUpdateProfileImage(req) {
  console.log("modelUpdateProfileImage REQ IS", req.body);
  // REPLACE array of pics with new one
  try {
    const newDataPics = await session
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
    console.log(
      "newDataPics",
      newDataPics.records[0]._fields[0].properties.fileList
    );
    return newDataPics.records[0]._fields[0].properties.fileList;
  } catch (err) {
    console.log("error modelUpdateProfile", err);
  }
}

module.exports = {
  modelUpdateProfileImage
};
