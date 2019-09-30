const { modelIsLiked } = require("../../models/modelRel/like/modelIsLiked");

async function isLiked(req, res) {
  try {
    const result = await modelIsLiked(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  isLiked
};
