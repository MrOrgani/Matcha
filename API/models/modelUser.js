const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function createUser(req, res) {
  if (!req.pics)
    req.pics = ["http://image.flaticon.com/icons/svg/53/53142.svg"];
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
              sexualPref:'bi',
              location:['', ''],
              phone:'',
              pics:{pics},
              bio:''  
            }) 
              RETURN u`,
    req
  );
  return data;
}

async function findOne(req, category) {
  const data = await session.run(
    `WITH {category} AS propname
        MATCH(u:User)
        WHERE u[toLower(propname)] = $value
        RETURN u`,
    {
      value: req,
      category: category
    }
  );
  if (data.records[0]) return data.records[0]._fields[0].properties;
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
              u.sexualPref = {sexualOrientation},
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
  createUser,
  gUsers,
  delUsers,
  getUsers,
  findOne,
  updateUser
};
