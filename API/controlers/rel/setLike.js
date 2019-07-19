const jwt = require("jsonwebtoken");
const { modelSetLike } = require("../../models/modelRel/modelSetLike");
const { modelSetUnlike } = require("../../models/modelRel/modelsetUnlike");
const { modelIsLiked } = require("../../models/modelRel/modelIsLiked");

async function setLike(req, res) {
  if ((await modelIsLiked(req.body)).length == 0) {
    try {
      const result = await modelSetLike(req.body);
      console.log("LIKE, FAME IS REAL");
      res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
  } else {
    try {
      const result = await modelSetUnlike(req.body);
      console.log("we have an unlike");
      res.status(200).send(result.record);
    } catch (err) {
      res.status(206).send(err);
    }
  }
}

module.exports = {
  setLike
};
