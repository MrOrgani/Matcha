const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function findOne(req, res) {
  try {
    // console.log(req.query);
    let data = await modelFindOne(req.query.uuidSource, "uuid");
    delete data.password;
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(206).send(err);
  }
};
