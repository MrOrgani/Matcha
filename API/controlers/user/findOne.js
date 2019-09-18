const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("../user/cleanUserData");

module.exports = async function findOne(req, res) {
  try {
    // console.log("in fondOne", req.query);
    const result = await modelFindOne(req.query.uuidSource, "uuid");
    // console.log("data in findone controller", data[0]._fields[0].properties);
    const data = await cleanUserData(result[0]._fields[0].properties);
    delete data.password;
    // console.log("data in findone controller", data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(206).send(err);
  }
};
