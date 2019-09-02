const { modelUserVerif } = require("../../../models/modelUser/modelUserVerif");

module.exports = async function userVerif(req, res, next) {
  try {
    if (req.query) {
      modelUserVerif(req.query);
      return next();
    } else if (req.body.values) {
      modelUserVerif(req.body.values);
      return next();
    } else if (req.body) {
      modelUserVerif(req.body);
      return next();
    }
    res.status(401).send(err);
  } catch (err) {
    res.status(401).send(err);
  }
};
