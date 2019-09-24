const { modelGetNotif } = require("../../models/modelNotif/modelGetNotif");

exports.getNotif = async (req, res) => {
  try {
    const result = await modelGetNotif(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
