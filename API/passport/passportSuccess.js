//OAUTH MANAGEMENT
const FortyTwoStrategy = require("passport-42").Strategy;
const passport = require("passport");
const modelCreateUser = require("../models/modelUser/modelCreateUser");
const modelFindOne = require("../models/modelUser/modelFindOne");
const cleanUserData = require("../controlers/user/cleanUserData");
const uuid = require("uuid/v4");

// //PASSPORT SETUP
// passport.use(
//   new FortyTwoStrategy(
//     {
//       clientID:
//         "df73b3fc5349efbfe57212d545fa735865396e52b4255c89e2302a385f0ab970",
//       clientSecret:
//         "879768eaf73a693d8feb1db647223d29be6555d3bd667ad6bf42d6adac9c3808",
//       callbackURL: "http://localhost:9000/api/Oauth/42/redirect"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, cb) => cb(null, user));
// passport.deserializeUser((obj, cb) => cb(null, obj));
// passport.inititialize();
// passport.session();

module.exports = async function passportSuccess(req, res) {
  // CREER UN COMPTE EN BACK
  const { emails, id, username } = req.user;
  const { first_name, last_name, image_url } = req.user._json;
  const result = await modelFindOne(parseInt(id), "IdDuoQuadra");

  if (result.length !== 0) {
    //ON REPREND LES INFOS SI ON A TROUVE UN USER
    const newUser = cleanUserData(result[0]._fields[0].properties);
    res.redirect(
      `http://localhost:3000/Oauth?jwt=${newUser.jwt}&uuid=${newUser.uuid}`
    );
  } else {
    try {
      //CREATE A NEW 42 USER
      const newUser = {
        body: {
          login: username,
          password: "",
          email: emails[0].value,
          firstName: first_name,
          lastName: last_name
        }
      };
      newUser.body.uuid = await uuid();
      await modelCreateUser(newUser, res);

      // ON AJOUTE DES CHAMPS DISPONIBLES ET ON REFORMATE
      modelFindOne(
        `${newUser.body.uuid}`,
        "uuid",
        `SET u.IdDuoQuadra=${id},
            u.lastName= '${last_name}',
            u.pics = ['${image_url}']`
      );
      newUser.body.jwt = await cleanUserData(newUser.body).jwt;

      // ON RENVOIE A UNE PAGE FRONT
      // console.log("created the 42 user", newUser.body);
      res.redirect(
        `http://localhost:3000/Oauth?jwt=${newUser.body.jwt}&uuid=${newUser.body.uuid}`
      );
    } catch (err) {
      console.log("error creating / finding 42 profile", err);
      res.redirect(`http://localhost:3000`);
    }
  }
};
