const {
  modelNewMessages
} = require("../../models/modelTempChat/modelNewMessages");

exports.newMessages = async (req, res) => {
  try {
    const result = await modelNewMessages(req.body);
    // console.log("in controler newMessages, result: ", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
