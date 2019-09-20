const { initNeo4j } = require("../initNeo4j");
const neo4j = require("neo4j-driver").v1;
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(req) {
  console.log("values MODELUPDATEPROFILE are", req.body.values.age);
  try {
    if (req.body.values.newpassword) {
      // console.log("THE PASSWORD WAS UPDATED", req.body.values);
      await session.run(
        `MATCH (u:User {uuid: {uuidSource}})
          SET u.password = {newpassword}`,
        {
          uuidSource: req.query.uuidSource,
          newpassword: req.body.values.newpassword
        }
      );
    }
    const userData = await session.run(
      `MATCH (u:User {uuid: {uuidSource}})
          SET u.firstName = {firstName},
              u.lastName = {lastName},
              u.age = {age},
              u.gender = {gender},
              u.lookingFor = {lookingFor},
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
        uuidSource: req.query.uuidSource,
        firstName: req.body.values.firstName,
        lastName: req.body.values.lastName,
        age: req.body.values.age,
        gender: req.body.values.gender,
        lookingFor: req.body.values.lookingFor,
        login: req.body.values.login,
        email: req.body.values.email,
        bio: req.body.values.bio,
        pics: req.body.values.pics,
        indexOfPP: req.body.values.indexOfPP.low,
        hobbies: req.body.values.hobbies,
        location: req.body.values.location
      }
    );

    await handlePracticeHobbies(req);
    // console.log(
    //   "THE NEW USER DATA",
    //   userData.records[0]._fields[0].properties.indexOfPP
    // );

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
    delete req.body.pics;
    console.log("we have an error in model update profile", err);
  }
}

async function handlePracticeHobbies(req) {
  await session
    .run(
      `MATCH (u:User {uuid: {uuidSource}})-[r:PRACTICE]->(h:Hobby)
                DETACH DELETE r`,
      {
        uuidSource: req.query.uuidSource
      }
    )
    .catch(err => console.log("err on delete practice: ", err));
  req.body.values.hobbies.map(async hobby => {
    // console.log("hobby is ", hobby);
    await session
      .run(
        `MATCH (u:User {uuid: {uuidSource}}),(h:Hobby {name:{hobby}})
      CREATE (u)-[r:PRACTICE]->(h)`,
        {
          uuidSource: req.query.uuidSource,
          hobby: hobby
        }
      )
      .catch(err => console.log("err on create practice: ", err));
  });
}

module.exports = {
  modelUpdateProfile
};
