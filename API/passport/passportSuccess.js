//OAUTH MANAGEMENT
const modelCreateUser = require("../models/modelUser/modelCreateUser");
const modelFindOne = require("../models/modelUser/modelFindOne");
const cleanUserData = require("../controlers/user/cleanUserData");
const uuid = require("uuid/v4");

module.exports = async function passportSuccess(req, res) {
  // CREER UN COMPTE EN BACK
  const { emails, id, username } = req.user;
  const { first_name, last_name, image_url } = req.user._json;
  const result = await modelFindOne(parseInt(id), "IdDuoQuadra");
  if (result.length !== 0) {
    //ON REPREND LES INFOS SI ON A TROUVE UN USER
    const newUser = cleanUserData(result);
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
            u.pics = ['${image_url}'],
            u.isConfirmed = true`
      );
      newUser.body.jwt = await cleanUserData(newUser.body).jwt;

      // ON RENVOIE A UNE PAGE FRONT
      res.redirect(
        `http://localhost:3000/Oauth?jwt=${newUser.body.jwt}&uuid=${newUser.body.uuid}`
      );
    } catch (err) {
      console.log("error creating / finding 42 profile", err);
      res.redirect(`http://localhost:3000`);
    }
  }
};
