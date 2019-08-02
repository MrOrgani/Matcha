const { modelIBlocked } = require("../../models/modelTempChat/modelIBlocked");

async function iBlocked(req, res) {
  try {
    const result = await modelIBlocked(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  iBlocked
};
