const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(values, res) {
  // console.log("value in MODEL USER", values);
  try {
    // MODIFICATION DU PASSWORD A REJOUTER + TELEPHONE + LOCATION
    const userData = await session.run(
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
      values.values
    );
    //// JWT auth token
    const token = jwt.sign(
      { uuid: userData.records[0]._fields[0].properties.uuid },
      process.env.TOKEN_SECRET
    );
    delete userData.records[0]._fields[0].properties.password;
    delete userData.records[0]._fields[0].properties.uuid;
    userData.records[0]._fields[0].properties.jwt = token;
    return userData.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelUpdateProfile
};
