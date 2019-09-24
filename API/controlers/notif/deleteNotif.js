const {
  modelDeleteNotif
} = require("../../models/modelNotif/modelDeleteNotif");

exports.deleteNotif = async (req, res) => {
  try {
    const result = await modelDeleteNotif(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
};
