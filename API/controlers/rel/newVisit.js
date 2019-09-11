const { modelNewVisit } = require("../../models/modelRel/Visit/modelNewVisit");

async function newVisit(req, res) {
  try {
    modelNewVisit(req.body);
    res.status(200).send();
  } catch (err) {
    console.log("in Controller visited", err, req.body);
    res.status(201).send(err);
  }
}

module.exports = {
  newVisit
};
