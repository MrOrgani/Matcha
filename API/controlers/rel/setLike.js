const { modelSetLike } = require("../../models/modelRel/modelSetLike");
const { modelSetUnlike } = require("../../models/modelRel/modelsetUnlike");

async function setLike(req, res) {
  try {
    const result = !req.body.liked
      ? await modelSetLike(req.body)
      : await modelSetUnlike(req.body);
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
