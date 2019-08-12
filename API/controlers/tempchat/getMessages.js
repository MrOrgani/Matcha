const {
  modelGetMessages
} = require("../../models/modelTempChat/modelGetMessages");

exports.getMessages = async (req, res) => {
  const messageArray = [];
  // console.log(req);
  try {
    const result = await modelGetMessages(req.query);
    // console.log("result in controller", result);
    result.forEach(elem => {
      // console.log(elem);
      let formattedElem = JSON.parse(elem);
      messageArray.push(formattedElem);
      // console.log(messageArray);
    });
    // console.log("in controler GetMessages, result: ", messageArray);
    res.status(200).send(messageArray);
  } catch (err) {
    res.status(206).send(err);
  }
};
