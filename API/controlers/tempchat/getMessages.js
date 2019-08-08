const {
  modelGetMessages
} = require("../../models/modelTempChat/modelGetMessages");

exports.getMessages = async (req, res) => {
  console.log(req);
  try {
    const result = await modelGetMessages(req.query);
    console.log("in controler GetMessages, result: ", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
