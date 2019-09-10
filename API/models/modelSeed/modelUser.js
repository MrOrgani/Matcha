const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function gUsers() {
  try {
    const test = await session.run(
      `CALL apoc.load.json('http://localhost:9000/api/user/')
          YIELD value AS data
          UNWIND data.results AS user
          MERGE (u:User {uuid: user.login.uuid})
          ON CREATE SET u.firstName = user.name.first,
            u.lastName = user.name.last,
              u.age = user.dob.age,
              u.gender = user.gender,
              u.sexualOrientation = 'bi',
              u.login = user.login.username,
              u.password = user.login.password,
              u.cell = user.cell,
              u.picMedium = user.picture.medium,
              u.picLarge = user.picture.large,
              u.email = user.email,
              u.city = user.location.city,
              u.location = user.coords,
              u.hobbies = user.hobbies,
              u.messages = [],
              u.notifs = [],
              u.isComplete = true,
              u.score = 50
          FOREACH (t in user.hobbies |
          MERGE (hob:Hobby {name: t})
          MERGE (u)-[:PRACTICE]->(hob))
          `
    );
  } catch (err) {
    console.log("gUsers error", err);
  }
}

async function delUsers() {
  try {
    session
      .run(
        `MATCH (n)
        DETACH DELETE n`
      )
      .catch(err => console.log(err));
  } catch (err) {
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
    res.status(206).send(err);
    console.log(err);
  }
}

module.exports = {
  gUsers,
  delUsers,
  getUsers
};
