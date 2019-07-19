// const modelLike = require("../../models/modelUserConnections/modelLike");
const jwt = require("jsonwebtoken");
const { modelIsLiked } = require("../../models/modelRel/modelIsLiked");

async function isLiked(req, res) {
  console.log(req.query);
  try {
    const result = await modelIsLiked(req.query);
    // console.log("result.record, controller is like", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  isLiked
};
