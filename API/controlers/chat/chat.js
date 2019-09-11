const { modelChat } = require("../../models/modelChat/modelChat");

exports.Chat = async (req, res) => {
  try {
    // console.log("ici");
    const result = await modelChat(req.query);
    let usersFound = [];
    if (result.length > 0) {
      result.map(item => usersFound.push(item._fields[0].properties));
    }
    // console.log(usersFound, req.query);
    res.status(200).send(usersFound);
  } catch (err) {
    console.log("in ChatAffinities", err, req.query);
    res.status(206).send(err);
  }
};
