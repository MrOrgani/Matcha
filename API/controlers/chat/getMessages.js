const { modelGetMessages } = require("../../models/modelChat/modelGetMessages");

exports.getMessages = async (req, res) => {
  const messageArray = [];
  try {
    const result = await modelGetMessages(req.query);
    result.forEach(elem => {
      let formattedElem = JSON.parse(elem);
      messageArray.push(formattedElem);
    });
    res.status(200).send(messageArray);
  } catch (err) {
    res.status(206).send(err);
  }
};
