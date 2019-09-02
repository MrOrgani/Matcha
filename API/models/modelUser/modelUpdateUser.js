// const { initNeo4j } = require("../initNeo4j");
// const session = initNeo4j();

// async function updateUser(values, res) {
//   // console.log("value in MODEL USER", values);
//   try {
//     // MODIFICATIO DU PASSWORD A REJOUTER + TELEPHONE + LOCATION
//     session
//       .run(
//         `MATCH (u:User {login: {loginRef}})
//         SET u.firstName = {firstName},
//             u.lastName = {lastName},
//               u.age = {age},
//               u.gender = {gender},
//               u.sexualOrientation = {sexualOrientation},
//               u.login = {login},
//               u.email = {email},
//               u.bio = {bio}
//               RETURN u
//            `,
//         values
//       )
//       .catch(err => console.log(err));
//   } catch (err) {
//     res.status(206).send(err);
//     console.log(err);
//   }
// }
