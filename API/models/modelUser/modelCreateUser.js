const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const low = require("../low");

module.exports = async function modelCreateUser(req) {
  const { login, password, email, uuid, firstName, lastName } = req.body;
  try {
    const data = await session
      .run(
        `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email},
              uuid:{uuid},
              firstName:{firstName},
              lastName:{lastName},
              age:0,
              gender:'',
              lookingFor:'',
              city: '',
              location:[48.864716, 2.349014],
              phone:'',
              bio:'',
              hobbies: [],
              pics: [],
              notifs: [], 
              indexOfPP: 0,
              score: 50,
              isComplete: false,
              isConfirmed: false
            }) 
              RETURN u`,
        {
          login: login,
          password: password,
          email: email,
          uuid: uuid,
          firstName: firstName,
          lastName: lastName
        }
      )
      .then(elem => {
        return low(elem.records[0]._fields[0].properties);
      });
    return data;
  } catch (err) {
    console.log("error in modelCreateUser", err, req.body);
  }
};
