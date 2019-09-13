const pathToModels = "../../models/modelRel/";
const { modelSetBlock } = require(`${pathToModels}Block/modelSetBlock`);
const { modelIsBlocked } = require(`${pathToModels}Block/modelIsBlocked`);
const { modelSetUnblock } = require(`${pathToModels}/Block/modelsetUnBlock`);
const { modelIsLiked } = require(`${pathToModels}like/modelIsLiked`);
const { setLike } = require(`../../controlers/rel/setLike`);

async function setBlock(req, res) {
  console.log("coucou SET BLOCK", req.body);

  try {
    let result = {};
    req.body.uuidSource = req.body.uuid;

    if (!(await modelIsBlocked(req.body))) {
      // ==> BLOCK
      if (await modelIsLiked(req.body, res)) {
        // ==>UNLIKE && UNMATCH
        await (() => {
          req.blocked = true;
          setLike(req, res); // CALL TO THE OTHER BIG CONTROLLER FNCT
        })();
        return (result = await modelSetBlock(req.body));
      }
      // blockEvent({ targetUuid: req.body.target });
      result = await modelSetBlock(req.body);
    } else result = await modelSetUnblock(req.body); // ==> UNBLOCK
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
