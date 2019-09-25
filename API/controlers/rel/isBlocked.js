const {
  modelIsBlocked
} = require("../../models/modelRel/block/modelIsBlocked");

async function isBlocked(req, res) {
  try {
    const result = await modelIsBlocked(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  isBlocked
};
