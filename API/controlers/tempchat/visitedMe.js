const { modelILiked } = require("../../models/modelTempChat/modelVisitedMe");

async function visitedMe(req, res) {
  try {
    const result = await modelVisitedMe(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  visitedMe
};
