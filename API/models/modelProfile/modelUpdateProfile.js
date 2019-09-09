const { initNeo4j } = require("../initNeo4j");
const neo4j = require("neo4j-driver").v1;
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(req) {
  // console.log("values MODELUPDATEPROFILE are", req.body.values);
  try {
    if (req.body.values.newpassword) {
      console.log("THE PASSWORD WAS UPDATED", req.body.values);
      await session
        .run(
          `MATCH (u:User {login: {userSource}})
          SET u.password = {newpassword}`,
          {
            userSource: req.query.userSource,
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
              u.location = {location},
              u.isComplete = true
              RETURN u
              `,
        {
          userSource: req.query.userSource,
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

    await handlePracticeHobbies(req);
    console.log("THE NEW USER DATA", userData);

    //// ********************* JWT auth token
    const token = jwt.sign(
      { uuid: userData.records[0]._fields[0].properties.uuid },
      process.env.TOKEN_SECRET
    );
    delete userData.records[0]._fields[0].properties.password;
    // delete userData.records[0]._fields[0].properties.uuid;
    userData.records[0]._fields[0].properties.jwt = token;
    // ------------------------------------

    // console.log(
    //   "value in MODEL USER",
    //   userData.records[0]._fields[0].properties
    // );
    return userData.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
}

async function handlePracticeHobbies(req) {
  await session
    .run(
      `MATCH (u:User {login: {userSource}})-[r:PRACTICE]->(h:Hobby)
                DETACH DELETE r`,
      {
        userSource: req.query.userSource
      }
    )
    .catch(err => console.log("err on delete practice: ", err));
  req.body.values.hobbies.map(async hobby => {
    // console.log("hobby is ", hobby);
    await session
      .run(
        `MATCH (u:User {login: {userSource}}),(h:Hobby {name:{hobby}})
      CREATE (u)-[r:PRACTICE]->(h)`,
        {
          userSource: req.query.userSource,
          hobby: hobby
        }
      )
      .catch(err => console.log("err on create practice: ", err));
  });
}

module.exports = {
  modelUpdateProfile
};
