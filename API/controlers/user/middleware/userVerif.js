const { modelUserVerif } = require("../../../models/modelUser/modelUserVerif");

module.exports = async function userVerif(req, res, next) {
  try {
    console.log("userverif", req.query);
    if (
      (req.query.jwt && req.query.uuidSource && modelUserVerif(req.query)) ||
      (req.body.values.jwt &&
        req.body.values.uuid &&
        modelUserVerif(req.body.values)) ||
      (req.body.jwt && req.body.login && modelUserVerif(req.body))
    ) {
      console.log("userVerif -> Was in modelUserverif -> return next()");
      return next();
    }
    // console.log();
    res.status(203).send("User not verified");
  } catch (err) {
    res.status(400).send(err);
  }
};
