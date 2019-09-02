const uuid = require("uuid/v4");
const modelCreateUser = require("./../../models/modelUser/modelCreateUser");
const sendEmail = require("./sendEmail");

module.exports = async function createUser(req, res) {
  try {
    console.log("createUser", req.body);
    req.body.uuid = await uuid();
    // NE PEUT-ON PAS SUPPRIMER DATA ICI, CEST UN POST ON NE RECUP/REVOIT PAS D'info
    const dataUser = await modelCreateUser(req);
    console.log("data creatuser", dataUser.uuid);
    //ENVOI D'EMAIL
    !dataUser.isAuth ? sendEmail(dataUser.email, "", dataUser.uuid) : "";
    res.status(200).end();
  } catch (err) {
    res.status(206).send(err);
  }
};
