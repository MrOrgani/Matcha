const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

module.exports = async function modelCreateUser(req) {
  const { login, password, email, uuid } = req.body;
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
              city: '',
              location:[48.864716, 2.349014],
              phone:'',
              bio:'',
              hobbies: [],
              pics: [],
              indexOfPP: 0,
              isAuth: false
            }) 
              RETURN u`,
      {
        login: login,
        password: password,
        email: email,
        uuid: uuid
      }
    );
    return data.records[0]._fields[0].properties;
  } catch (err) {
    console.log(err);
  }
};
