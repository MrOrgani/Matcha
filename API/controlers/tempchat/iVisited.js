const { modelIVisited } = require("../../models/modelTempChat/modelIVisited");

async function iVisited(req, res) {
  try {
    const result = await modelIVisited(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  iVisited
};
