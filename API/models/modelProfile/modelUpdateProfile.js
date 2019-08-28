const { initNeo4j } = require("../initNeo4j");
const neo4j = require("neo4j-driver").v1;
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(req) {
  // console.log("values MODELUPDATEPROFILE are", req.body.values);
  try {
    if (req.body.values.newpassword) {
      // console.log("MODELUPDATEPROFILE in here bitch");
      await session
        .run(
          `MATCH (u:User {login: {userSource}})
          SET u.password = {newpassword}`,
          {
            userSource: req.query.login,
            newpassword: req.body.values.newpassword
          }
        )
        .catch(err => console.log(err));
    }
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
              u.pics = {pics},
              u.indexOfPP = {indexOfPP},
              u.hobbies = {hobbies},
              u.location = {location}
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
          bio: req.body.values.bio,
          pics: req.body.values.pics,
          indexOfPP: req.body.values.indexOfPP,
          hobbies: req.body.values.hobbies,
          location: req.body.values.location
        }
      )
      .catch(err => console.log(err));

    // console.log("THE NEW USER DATA", userData);
    //// JWT auth token
    const token = jwt.sign(
      { uuid: userData.records[0]._fields[0].properties.uuid },
      process.env.TOKEN_SECRET
    );
    delete userData.records[0]._fields[0].properties.password;
    delete userData.records[0]._fields[0].properties.uuid;
    userData.records[0]._fields[0].properties.jwt = token;

    // console.log(
    //   "value in MODEL USER",
    //   userData.records[0]._fields[0].properties
    // );
    return userData.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelUpdateProfile
};
