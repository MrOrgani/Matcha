const { modelTempChat } = require("../../models/modelTempChat/modelTempChat");

exports.tempChat = async (req, res) => {
  try {
    const result = await modelTempChat(req.query);
    let usersFound = [];
    if (result.length > 0) {
      result.map(item => usersFound.push(item._fields[0].properties));
    }
    res.status(200).send(usersFound);
  } catch (err) {
    res.status(206).send(err);
  }
};
