const { modelChat } = require("../../models/modelChat/modelChat");

exports.Chat = async (req, res) => {
  try {
    const result = await modelChat(req.query);
    res.status(200).send(result);
  } catch (err) {
    console.log("error in ChatAffinities", err, req.query);
    res.status(206).send(err);
  }
};
