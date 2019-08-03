const { modelSetBlock } = require("../../models/modelRel/Block/modelSetBlock");
const {
  modelSetUnblock
} = require("../../models/modelRel/Block/modelsetUnBlock");

async function setBlock(req, res) {
  try {
    const result = !req.body.blocked
      ? await modelSetBlock(req.body)
      : await modelSetUnblock(req.body);
    return result.records.length > 0
      ? res.status(200).send(result.records)
      : res.status(201).end();
  } catch (err) {
    res.status(406).send(err);
  }
}

module.exports = {
  setBlock
};
