const pathToModels = `../../models/modelRel/`;
const { modelSetLike } = require(`${pathToModels}like/modelSetLike`);
const { modelSetUnlike } = require(`${pathToModels}like/modelsetUnlike`);
const { modelIsLiked } = require(`${pathToModels}like/modelIsLiked`);
const { modelIsMatched } = require(`${pathToModels}match/modelIsMatched`);
const { modelSetMatched } = require(`${pathToModels}match/modelSetMatched`);
const { modelSetUnMatched } = require(`${pathToModels}match/modelSetUnMatched`);
const { modelChangeScore } = require(`${pathToModels}score/modelChangeScore`);

async function setLike(req, res) {
  // console.log(`in SetLiked", req);
  const invertReq = {
    uuidSource: req.body.target,
    target: req.body.uuidSource
  };
  try {
    console.log("in setLike");
    if (!(await modelIsLiked(req.body))) {
      console.log("liking");
      modelChangeScore(req.body, 5);
      modelSetLike(req.body);
      if (!(await modelIsMatched(req))) {
        modelChangeScore(req.body, 15);
        modelSetMatched(req.body);
      }
      res.status(200).send();
    } else {
      console.log("unliking");
      modelChangeScore(req.body, -5);
      modelSetUnlike(req.body);
      if (await modelIsMatched(req.body)) {
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
