const { modelSetLike } = require("../../models/modelRel/like/modelSetLike");
const { modelSetUnlike } = require("../../models/modelRel/like/modelsetUnlike");
const {
  modelChangeScore
} = require("../../models/modelRel/score/modelChangeScore");

async function setLike(req, res) {
  // console.log("in SetLiked");
  try {
    if (!req.body.liked) {
      modelChangeScore(req.body, 5);
      await modelSetLike(req.body);
      res.status(200).send();
    } else {
      modelChangeScore(req.body, -5);
      await modelSetUnlike(req.body);
      res.status(201).send();
    }
  } catch (err) {
    console.log("err in setLike", err, req.body);
    res.status(406).send(err);
  }
}

module.exports = {
  setLike
};
