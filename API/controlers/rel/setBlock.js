const { modelSetBlock } = require("../../models/modelRel/Block/modelSetBlock");
const {
  modelSetUnblock
} = require("../../models/modelRel/Block/modelsetUnBlock");
const { modelUserVerif } = require("../../models/modelUserVerif");

async function setBlock(req, res) {
  // console.log(await modelUserVerif(req.body, res));
  if (!(await modelUserVerif(req.body, res))) {
    res.status(206).send("");
    return;
  }
  if (!req.body.blocked) {
    try {
      const result = await modelSetBlock(req.body);
      // console.log("Block, FAME IS REAL");
      res.status(200).send(result);
    } catch (err) {
      res.status(206).send(err);
    }
  } else {
    try {
      const result = await modelSetUnblock(req.body);
      // console.log("we have an unBlock");
      res.status(201).send(result.record);
    } catch (err) {
      res.status(206).send(err);
    }
  }
}

module.exports = {
  setBlock
};
