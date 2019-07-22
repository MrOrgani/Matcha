const { modelSetLike } = require("../../models/modelRel/modelSetLike");
const { modelSetUnlike } = require("../../models/modelRel/modelsetUnlike");
const { modelIsLiked } = require("../../models/modelRel/modelIsLiked");
const { modelUserVerif } = require("../../models/modelUserVerif");

async function setLike(req, res) {
  // console.log("ici");
  // console.log(await modelUserVerif(req.body, res));
  if (!(await modelUserVerif(req.body, res))) {
    res
      .status(206)
      .send("Jwt error, it looks like you might be trying to fuck us");
    return;
  }
  if (!req.body.liked) {
    try {
      const result = await modelSetLike(req.body);
      // console.log("LIKE, FAME IS REAL");
      res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
  } else {
    try {
      const result = await modelSetUnlike(req.body);
      // console.log("we have an unlike");
      res.status(201).send(result.record);
    } catch (err) {
      res.status(206).send(err);
    }
  }
}

module.exports = {
  setLike
};
