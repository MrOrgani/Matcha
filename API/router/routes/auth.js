const router = require("express").Router();
const fetch = require("node-fetch");
const hobby = require("../../public/includes/hobbies");
// const cors = require("cors");
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "2j54A%")
);
const session = driver.session();

router.route("/").post(async (req, res) => {
  //check if email already exists
  // const emailExist = await User.findOne({ email: req.body.email });
  // if (emailExist) return res.status(400).send("Email already exists");
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
  } catch (error) {
    console.log(error);
  }
});

const url = "https://randomuser.me/api/?results=100&nat=FR";
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    let hobbiesExample = hobby.hobbiesExample();

    json.results.forEach((element, index) => {
      let hobbyUser = [];
      for (let y = 0; y < 6; y++) {
        hobbyUser.push(
          hobbiesExample[Math.floor(Math.random() * (49 - 0 + 1))]
        );
      }
      element.hobbies = hobbyUser;
      element.index = index;
    });
    router.get("/generate", (req, res) => {
      res.send(json);
      session
        .run(
          `CALL apoc.load.json('http://localhost:5000/api/user/generate')
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
              u.email = user.email
          FOREACH (t in user.hobbies |
          MERGE (hob:Hobby {name: t})
          MERGE (u)-[:PRACTICE]->(hob))`
        )
        .catch(err => console.log(err));
    });
  } catch (error) {
    console.log(error);
  }
};
getData(url);

module.exports = router;
