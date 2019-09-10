const { modelSetLike } = require("../../models/modelRel/like/modelSetLike");
const { modelSetUnlike } = require("../../models/modelRel/like/modelsetUnlike");
const {
  modelChangeScore
} = require("../../models/modelRel/score/modelChangeScore");

async function setLike(req, res) {
  try {
    const result = !req.body.liked
      ? modelChangeScore(req.body, 5) && (await modelSetLike(req.body))
      : (await modelSetUnlike(req.body)) && modelChangeScore(req.body, -5);
    return result.records.length > 0
      ? res.status(200).send(result.records)
      : res.status(201).end();
  } catch (err) {
    res.status(406).send(err);
  }
}

module.exports = {
  setLike
};
