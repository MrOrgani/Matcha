const { modelUserVerif } = require("../../../models/modelUser/modelUserVerif");

module.exports = async function userVerif(req, res, next) {
  try {
    // console.log("in userverif controller", req.query, req.body);

    if (req.query.jwt && req.query.uuidSource && modelUserVerif(req.query)) {
      return next();
    }
    if (req.body.jwt && req.body.uuidSource && modelUserVerif(req.body)) {
      // (req.body.values.jwt &&
      //   req.body.values.uuid &&
      //   modelUserVerif(req.body.values))

      // console.log("userVerif -> Was in modelUserverif -> return next()");
      return next();
    }
    // console.log("user not verified", req.body);
    res.status(203).send("User not verified");
  } catch (err) {
    console.log("error in the userVerifDepartment", err);
    res.status(400).send(err);
  }
};
