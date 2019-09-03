const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelCreateUser(req) {
  try {
    const data = await session.run(
      `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email},
              uuid:{uuid},
              firstName:'',
              lastName:'',
              age:'',
              gender:'',
              sexualOrientation:'bi',
              location:['', ''],
              phone:'',
              bio:'',
              tag: [],
              notifs: [],
              fileList: []
            }) 
              RETURN u`,
      req
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function modelFindOne(value, category) {
  const data = await session.run(
    `WITH {category} AS propname
    MATCH(u:User)
    WHERE u[propname] = $value
    RETURN u`,
    {
      value: value,
      category: category
    }
  );
  return data.records;
}

async function gUsers() {
  session
    .run(
      `CALL apoc.load.json('http://localhost:9000/api/user/')
          YIELD value AS data
          UNWIND data.results AS user
          MERGE (u:User {uuid: user.id.value})
          ON CREATE SET u.firstName = user.name.first,
            u.lastName = user.name.last,
              u.age = user.dob.age,
              u.gender = user.gender,
              u.sexualOrientation = 'bi',
              u.login = user.login.username,
              u.password = user.login.password,
              u.location = [user.location.coordinates.latitude, user.location.coordinates.longitude],
              u.cell = user.cell,
              u.picMedium = user.picture.medium,
              u.picLarge = user.picture.large,
              u.email = user.email,
              u.isComplete = 1
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
    res.status(206).send(err);
    console.log(err);
  }
}

async function updateUser(values, res) {
  // console.log("value in MODEL USER", values);
  try {
    // MODIFICATIO DU PASSWORD A REJOUTER + TELEPHONE + LOCATION
    session
      .run(
        `MATCH (u:User {login: {loginRef}})
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
        values
      )
      .catch(err => console.log(err));
  } catch (err) {
    res.status(206).send(err);
    console.log(err);
  }
}

module.exports = {
  modelCreateUser,
  gUsers,
  delUsers,
  getUsers,
  modelFindOne,
  updateUser
};
