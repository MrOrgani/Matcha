const { modelNewNotif } = require("../../models/modelNotif/modelNewNotif");

exports.newNotif = async (req, res) => {
  try {
    const result = await modelNewNotif(req.body);
    // console.log("in controler newMessages, result: ", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
