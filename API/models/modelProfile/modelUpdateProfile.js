const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();
const jwt = require("jsonwebtoken");

async function modelUpdateProfile(values, res) {
  console.log("value in MODEL USER", values);
  try {
    // MODIFICATION DU PASSWORD A REJOUTER + TELEPHONE + LOCATION
    session
      .run(
        `MATCH (u:User {login: {userSource}})
          SET u.firstName = {firstName},
              u.lastName = {lastName},
                u.age = {age},
                u.gender = {gender},
                u.sexualPref = {sexualOrientation},
                u.login = {login},
                u.email = {email},
                u.bio = {bio}
                RETURN u
             `,
        values
      )
      .then(userData => {
        console.log("UserData in ModelUpdateProfile", userData);
        delete userData.password;

        // JWT auth token
        const token = jwt.sign(
          { uuid: userData.uuid },
          process.env.TOKEN_SECRET
        );
        delete userData.uuid;
        userData.jwt = token;
        return userData;
      })
      .catch(err => console.log(err));
  } catch (err) {
    res.status(206).send(err);
    console.log(err);
  }
}

module.exports = {
  modelUpdateProfile
};
