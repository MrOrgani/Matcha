const { modelChat } = require("../../models/modelChat/modelChat");

exports.Chat = async (req, res) => {
  try {
    const result = await modelChat(req.query);
    let usersFound = [];
    if (result.length > 0) {
      result.map(item => usersFound.push(item._fields[0].properties));
    }
    res.status(200).send(usersFound);
  } catch (err) {
    res.status(206).send(err);
  }
};
