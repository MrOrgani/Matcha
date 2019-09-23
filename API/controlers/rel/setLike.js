const pathToModels = `../../models/modelRel/`;
const { modelSetLike } = require(`${pathToModels}like/modelSetLike`);
const { modelSetUnlike } = require(`${pathToModels}like/modelsetUnlike`);
const { modelIsLiked } = require(`${pathToModels}like/modelIsLiked`);
const { modelIsMatched } = require(`${pathToModels}match/modelIsMatched`);
const { modelSetMatched } = require(`${pathToModels}match/modelSetMatched`);
const { modelSetUnMatched } = require(`${pathToModels}match/modelSetUnMatched`);
const { modelChangeScore } = require(`${pathToModels}score/modelChangeScore`);
const { modelIsBlocked } = require(`${pathToModels}Block/modelIsBlocked`);
const { notify } = require("../../Sockets/newNotif");
const { unmatchEvent } = require("../../Sockets/unmatchEvent");

async function setLike(req, res) {
  const invertReq = {
    uuidSource: req.body.target,
    target: req.body.uuidSource
  };

  try {
    if (await modelIsBlocked(req.body))
      // ==> DO NOTHING
      return res.status(200).json({ liked: false, blocked: true });
    if (!(await modelIsLiked(req.body))) {
      // ==> LIKE
      modelChangeScore(req.body, 5);
      modelSetLike(req.body);
      if (await modelIsLiked(invertReq)) {
        // ==> MATCH
        modelChangeScore(req.body, 10);
        modelSetMatched(req.body);
        notify({
          targetUuid: req.body.target,
          uuidSource: req.body.uuidSource,
          type: "matched"
        });
        notify({
          targetUuid: req.body.uuidSource,
          uuidSource: req.body.target,
          type: "matched"
        });
      }
      res.status(200).json({ liked: true, blocked: false });
    } else {
      // ==> UNLIKE
      modelChangeScore(req.body, -5);
      modelSetUnlike(req.body);
      if (await modelIsMatched(req.body)) {
        // ==> UNMATCH
        notify({
          targetUuid: req.body.target,
          uuidSource: req.body.uuidSource,
          type: "unmatched"
        });
        unmatchEvent(req.body);
        modelChangeScore(req.body, -10);
        modelSetUnMatched(req.body);
        if (!req.blocked)
          return res.status(200).json({ liked: false, blocked: false });
        else return res.status(200).json({ liked: false, blocked: true });
      }
      if (!req.blocked)
        return res.status(200).json({ liked: false, blocked: false });
      else return res.status(200).json({ liked: false, blocked: true });
    }
  } catch (err) {
    console.log("err in setLike", err, req.body);
    res.status(406).send(err);
  }
}

module.exports = {
  setLike
};
