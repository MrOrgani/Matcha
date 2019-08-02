const { modelLikedMe } = require("../../models/modelTempChat/modelLikedMe");

async function likedMe(req, res) {
  try {
    const result = await modelLikedMe(req.query);
    res.status(200).send(result);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  likedMe
};
