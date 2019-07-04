const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function createUser(req, res) {
  console.log(req);
  try {
    session
      .run(
        `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email}
              }) 
              RETURN u`,
        {
          login: req.body.login,
          password: req.body.password,
          email: req.body.email
        }
      )
      .then(data => res.send(data))
      .catch(err => console.log(err));
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

async function gUsers(req, res) {
  session
    .run(
      `CALL apoc.load.json('http://localhost:9000/api/user/generate')
          YIELD value AS data
          UNWIND data.results AS user
          MERGE (u:User {user_id: user.id.value})
          ON CREATE SET u.firstName = user.name.first,
            u.lastName = user.name.last,
              u.age = user.dob.age,
              u.gender = user.gender,
              u.sexualPref = 'bi',
              u.login = user.login.username,
              u.password = user.login.password,
              u.location = [user.location.coordinates.latitude, user.location.coordinates.longitude],
              u.cell = user.cell,
              u.picMedium = user.picture.medium,
              u.picLarge = user.picture.large,
              u.email = user.email
          FOREACH (t in user.hobbies |
          MERGE (hob:Hobby {name: t})
          MERGE (u)-[:PRACTICE]->(hob))`
    )
    .catch(err => console.log(err));
}

async function delUsers(req, res) {
  try {
    session
      .run(
        `MATCH (n)
        DETACH DELETE n`
      )
      .catch(err => console.log(err));
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

async function getUsers(req, res) {
  try {
    session
      .run(`MATCH (n:User) RETURN n`)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

module.exports = {
  createUser,
  gUsers,
  delUsers,
  getUsers
};
