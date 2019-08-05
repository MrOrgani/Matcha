const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(req) {
  console.log("values MODELUPDATEPROFILE are");
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
                u.bio = {bio}
                RETURN u
                `,
        {
          userSource: req.query.login,
          firstName: req.body.values.firstName,
          lastName: req.body.values.lastName,
          age: req.body.values.age,
          gender: req.body.values.gender,
          sexualOrientation: req.body.values.sexualOrientation,
          login: req.body.values.login,
          email: req.body.values.email,
          bio: req.body.values.bio
        }
      )
      .catch(err => console.log(err));
    console.log("THE NEW USER DATA", userData);
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
