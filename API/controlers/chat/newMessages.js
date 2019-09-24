const { modelNewMessages } = require("../../models/modelChat/modelNewMessages");

exports.newMessages = async (req, res) => {
  try {
    const result = await modelNewMessages(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
