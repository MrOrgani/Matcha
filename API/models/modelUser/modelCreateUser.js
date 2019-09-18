const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

module.exports = async function modelCreateUser(req) {
  const { login, password, email, uuid, firstName, lastName } = req.body;
  try {
    const data = await session.run(
      `CREATE(u:User {
              login:{login},
              password:{password},
              email:{email},
              uuid:{uuid},
              firstName:{firstName},
              lastName:{lastName},
              age:'',
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
              isConfirmed: true
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
    );
    return data.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
};
