const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("../user/cleanUserData");

module.exports = async function findOne(req, res) {
  try {
    const result = await modelFindOne(req.query.uuidSource, "uuid");
    const data = await cleanUserData(result);
    delete data.password;
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(206).send(err);
  }
};
