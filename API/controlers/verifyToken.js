const { modelUserVerif } = require("../models/modelUserVerif");

module.exports = async function userVerif(req, res) {
  console.log(await modelUserVerif(req.body, res));
  if (!(await modelUserVerif(req.body, res))) {
    res.status(206).send("");
    return false;
  } else res.status(200).send(true);
};
