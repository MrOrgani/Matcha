const pathToModels = `../../models/modelRel/`;
const { modelSetLike } = require(`${pathToModels}like/modelSetLike`);
const { modelSetUnlike } = require(`${pathToModels}like/modelsetUnlike`);
const { modelIsLiked } = require(`${pathToModels}like/modelIsLiked`);
const { modelIsMatched } = require(`${pathToModels}match/modelIsMatched`);
const { modelSetMatched } = require(`${pathToModels}match/modelSetMatched`);
const { modelSetUnMatched } = require(`${pathToModels}match/modelSetUnMatched`);
const { modelChangeScore } = require(`${pathToModels}score/modelChangeScore`);
const { notify } = require("../../Sockets/newNotif");

async function setLike(req, res) {
  // console.log(`in SetLiked", req);
  const invertReq = {
    uuidSource: req.body.target,
    target: req.body.uuidSource
  };
  try {
    // console.log("in setLike");
    if (!(await modelIsLiked(req.body))) {
      modelChangeScore(req.body, 5);
      // console.log("liking");
      modelSetLike(req.body);
      if (await modelIsLiked(invertReq)) {
        modelChangeScore(req.body, 15);
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
        modelSetMatched(req.body);
      }
      res.status(200).send();
    } else {
      modelChangeScore(req.body, -5);
      // console.log("unliking");
      modelSetUnlike(req.body);
      if (await modelIsMatched(req.body)) {
        notify({
          targetUuid: req.body.target,
          uuidSource: req.body.uuidSource,
          type: "unmatched"
        });
        modelChangeScore(req.body, -15);
        modelSetUnMatched(req.body);
      }
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
