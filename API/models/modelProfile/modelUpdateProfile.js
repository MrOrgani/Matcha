const {initNeo4j} = require('../initNeo4j')
const session = initNeo4j()
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(values) {
  console.log('values are', values)
  try {
    const userData = await session
      .run(
        `MATCH (u:User {login: {userSource}})
          SET u.firstName = {firstName},
              u.lastName = {lastName},
                u.age = {age},
                u.gender = {gender},
                u.sexualOrientation = {sexualOrientation},
                u.login = {login},
                u.email = {email},
                u.bio = {bio},
                u.fileList = {fileList}
                RETURN u
                `,
        values
      )
      .catch(err => console.log(err));
    //// JWT auth token
    const token = jwt.sign(
      { uuid: userData.records[0]._fields[0].properties.uuid },
      process.env.TOKEN_SECRET
    );
    delete userData.records[0]._fields[0].properties.password;
    delete userData.records[0]._fields[0].properties.uuid;
    userData.records[0]._fields[0].properties.jwt = token;

    console.log(
      "value in MODEL USER",
      userData.records[0]._fields[0].properties
    );
    return userData.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelUpdateProfile
};
