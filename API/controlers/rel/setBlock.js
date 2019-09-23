const pathToModels = "../../models/modelRel/";
const { modelSetBlock } = require(`${pathToModels}Block/modelSetBlock`);
const { modelIsBlocked } = require(`${pathToModels}Block/modelIsBlocked`);
const { modelSetUnblock } = require(`${pathToModels}/Block/modelsetUnBlock`);
const { modelIsLiked } = require(`${pathToModels}like/modelIsLiked`);
const { setLike } = require(`../../controlers/rel/setLike`);
const { modelChangeScore } = require(`${pathToModels}/score/modelChangeScore`);

async function setBlock(req, res) {
  try {
    let result = {};
    req.body.uuidSource = req.body.uuid;

    if (!(await modelIsBlocked(req.body))) {
      // ==> BLOCK
      modelChangeScore(req.body, -10);
      if (await modelIsLiked(req.body, res)) {
        // ==>UNLIKE && UNMATCH
        await (() => {
          req.blocked = true;
          req.liked = false;
          setLike(req, res); // CALL TO THE OTHER BIG CONTROLLER FNCT
        })();
        return (result = await modelSetBlock(req.body));
      }
      // blockEvent({ targetUuid: req.body.target });
      result = await modelSetBlock(req.body);
    } else {
      // ==> UNBLOCK
      modelChangeScore(req.body, 10);
      result = await modelSetUnblock(req.body);
    }
    return result.records.length > 0
      ? res.status(200).send(JSON.stringify({ blocked: true, liked: false }))
      : res.status(200).end(JSON.stringify({ blocked: false, liked: false }));
  } catch (err) {
    console.log("error in setBlock Controller", err, req.body);
    res.status(406).send(err);
  }
}

module.exports = {
  setBlock
};
